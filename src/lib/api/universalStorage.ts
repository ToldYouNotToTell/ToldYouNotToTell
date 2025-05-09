import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  increment,
  arrayUnion,
  arrayRemove,
  where,
  Timestamp,
  DocumentData,
  UpdateData
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { Post, BoostTier } from "@/types/post";

type PostStatus = 'approved' | 'rejected' | 'pending';

export class UniversalStorage {
  private get postsRef() {
    if (!db) throw new Error("Firestore not initialized");
    return collection(db, "posts");
  }

  async addPost(postData: Omit<Post, "id">): Promise<string> {
    if (!db) throw new Error("Firestore not initialized");

    try {
      const cleanPost = {
        ...postData,
        shortId: this.generateShortId(),
        date: this.normalizeDate(postData.date) ?? Timestamp.now(),
        votes: {},
        positiveVotesCount: 0,
        comments: [],
        status: 'pending'
      };

      const ref = await addDoc(this.postsRef, cleanPost);
      return ref.id;
    } catch {
      throw new Error("Failed to create post");
    }
  }

  async getPost(id: string): Promise<Post | null> {
    try {
      const snap = await getDoc(doc(this.postsRef, id));
      if (!snap.exists()) return null;
      
      const data = snap.data();
      return {
        ...this.parsePostData(snap.id, data),
        date: this.normalizeDate(data.date),
        boostTime: data.boostTime ? this.normalizeDate(data.boostTime) : null,
        currentBoostWeight: data.currentBoostWeight ? Number(data.currentBoostWeight) : null
      };
    } catch {
      return null;
    }
  }
  
  async getPosts(): Promise<Post[]> {
    try {
      const snaps = await getDocs(
        query(this.postsRef, orderBy("orderNumber", "desc"))
      );
      
      return snaps.docs.map(doc => {
        const data = doc.data();
        return {
          ...this.parsePostData(doc.id, data),
          date: this.normalizeDate(data.date),
          boostTime: data.boostTime ? this.normalizeDate(data.boostTime) : null,
          currentBoostWeight: data.currentBoostWeight ? Number(data.currentBoostWeight) : null
        };
      });
    } catch {
      return [];
    }
  }

  async updatePost(id: string, updates: Partial<Post>): Promise<void> {
    try {
      await updateDoc(doc(this.postsRef, id), this.prepareUpdateData(updates));
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Failed to update post");
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.postsRef, id));
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Failed to delete post");
    }
  }

  // ====== Moderation Methods ======
  async moderatePost(
    postId: string,
    action: 'approve' | 'reject',
    moderatorId: string,
    note?: string
  ): Promise<void> {
    try {
      const status: PostStatus = action === 'approve' ? 'approved' : 'rejected';
      const updates: Partial<Post> = {
        status,
        moderatedBy: moderatorId,
        moderatorNote: note || null
      };
      
      await this.updatePost(postId, updates);
    } catch {
      throw new Error("Failed to moderate post");
    }
  }

  async getPostsForModeration(): Promise<Post[]> {
    try {
      const q = query(
        this.postsRef,
        where('status', '==', 'pending'),
        orderBy('date', 'desc')
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...this.parsePostData(doc.id, data),
          date: this.normalizeDate(data.date),
          boostTime: data.boostTime ? this.normalizeDate(data.boostTime) : null,
          currentBoostWeight: data.currentBoostWeight ? Number(data.currentBoostWeight) : null
        };
      });
    } catch {
      return [];
    }
  }

  // ====== Comment Methods ======
  async addComment(postId: string, comment: { 
    text: string; 
    authorIp: string; 
    date: string;
    id: string;
  }): Promise<void> {
    try {
      await updateDoc(doc(this.postsRef, postId), {
        comments: arrayUnion({
          id: comment.id,
          text: comment.text,
          authorIp: comment.authorIp,
          date: comment.date
        })
      });
    } catch {
      throw new Error("Failed to add comment");
    }
  }

  async deleteComment(postId: string, commentId: string, userIp: string): Promise<void> {
    try {
      const post = await this.getPost(postId);
      const comment = post?.comments.find(c => c.id === commentId);
      
      if (!comment || comment.authorIp !== userIp) {
        throw new Error("Not authorized to delete this comment");
      }
  
      await updateDoc(doc(this.postsRef, postId), {
        comments: arrayRemove(comment)
      });
    } catch {
      throw new Error("Failed to delete comment");
    }
  }

  async editComment(postId: string, commentId: string, newText: string, userIp: string): Promise<void> {
    try {
      const post = await this.getPost(postId);
      if (!post?.comments) return;
  
      const commentIndex = post.comments.findIndex(c => c.id === commentId);
      if (commentIndex === -1) return;
  
      if (post.comments[commentIndex].authorIp !== userIp) {
        throw new Error("Not authorized to edit this comment");
      }
  
      const updatedComments = [...post.comments];
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        text: newText
      };
  
      await updateDoc(doc(this.postsRef, postId), {
        comments: updatedComments
      });
    } catch {
      throw new Error("Failed to edit comment");
    }
  }

  // ====== Vote Methods ======
  async votePost(postId: string, voterId: string, value: 1 | -1): Promise<void> {
    try {
      const postRef = doc(this.postsRef, postId);
      const postSnap = await getDoc(postRef);
      
      if (!postSnap.exists()) throw new Error("Post not found");
      
      const currentVote = postSnap.data().votes?.[voterId] || 0;
      const voteChange = value === 1 ? 1 : -1;
      
      // Если пользователь уже голосовал так же, снимаем голос
      const newValue = currentVote === value ? 0 : value;
      const countChange = newValue === 0 ? -currentVote : voteChange - currentVote;
      
      await updateDoc(postRef, {
        [`votes.${voterId}`]: newValue,
        positiveVotesCount: increment(countChange)
      });
    } catch {
      throw new Error("Failed to vote post");
    }
  }

  // ====== Boost Methods ======
  async boostPost(postId: string, tier: BoostTier | null): Promise<void> {
    try {
      const now = Timestamp.now();
      const updates: Partial<Post> = {
        boostTier: tier,
        boostAmount: tier?.amount ?? null,
        boostTime: tier ? now : null,
        currentBoostWeight: tier ? this.calculateBoostWeight(tier, now.toMillis()) : null
      };

      await this.updatePost(postId, updates);
    } catch {
      throw new Error("Failed to boost post");
    }
  }

  // ====== Private Helpers ======
  private preparePostData(postData: Omit<Post, "id">): Record<string, unknown> {
    if (!postData.title || !postData.content) {
      throw new Error("Title and content are required");
    }

    return {
      ...postData,
      title: postData.title.trim(),
      content: postData.content.trim(),
      date: this.normalizeDate(postData.date) ?? Timestamp.now(),
      votes: postData.votes || {},
      positiveVotesCount: postData.positiveVotesCount || 0,
      comments: postData.comments || [],
      orderNumber: postData.orderNumber || Date.now(),
      status: postData.status || 'pending',
      authorWallet: postData.authorWallet ?? null,
      category: postData.category ?? undefined,
      boostTier: null,
      boostAmount: null,
      boostTime: null,
      currentBoostWeight: null,
      moderatedBy: null,
      moderatorNote: null,
    };
  }
  
  private generateShortId(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Исключаем 0,1,O,I
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private prepareUpdateData(updates: Partial<Post>): UpdateData<Post> {
    const updateData: UpdateData<Post> = {};
    
    const fields: Array<keyof Post> = [
      'title', 'content', 'authorIp', 'authorWallet', 'category',
      'date', 'votes', 'positiveVotesCount', 'comments', 'orderNumber', 
      'status', 'boostTier', 'boostAmount', 'boostTime', 
      'currentBoostWeight', 'moderatedBy', 'moderatorNote',
    ];
  
    fields.forEach(field => {
      if (field in updates && updates[field] !== undefined) {
        if (field === 'date' || field === 'boostTime') {
          const normalized = this.normalizeDate(updates[field]);
          if (normalized !== undefined) {
            updateData[field] = normalized;
          }
        } else {
          updateData[field] = updates[field] as never;
        }
      }
    });

    return updateData;
  }

  public parsePostData(id: string, data: DocumentData): Omit<Post, 'date' | 'boostTime'> {
    return {
      id,
      shortId: String(data.shortId || ''),
      title: String(data.title || ''),
      content: String(data.content || ''),
      authorIp: data.authorIp ? String(data.authorIp) : null,
      authorWallet: data.authorWallet ? String(data.authorWallet) : null,
      category: data.category ? String(data.category) : undefined,
      votes: data.votes && typeof data.votes === 'object' ? data.votes as Record<string, number> : {},
      positiveVotesCount: Number(data.positiveVotesCount || 0),
      comments: Array.isArray(data.comments) ? data.comments.map(comment => ({
        id: String(comment.id || Date.now()),
        text: String(comment.text || ''),
        authorIp: comment.authorIp ? String(comment.authorIp) : null,
        date: comment.date ? new Date(comment.date).toISOString() : new Date().toISOString()
      })) : [],
      orderNumber: Number(data.orderNumber || 0),
      status: ['pending', 'approved', 'rejected'].includes(data.status) 
        ? data.status as PostStatus 
        : 'pending',
      boostTier: data.boostTier || null,
      boostAmount: data.boostAmount ? Number(data.boostAmount) : null,
      moderatedBy: data.moderatedBy ? String(data.moderatedBy) : null,
      moderatorNote: data.moderatorNote ? String(data.moderatorNote) : null,
    };
  }
  
  // Вспомогательный метод (должен быть в классе)
  private normalizeDate(date?: unknown): Timestamp {
    if (date instanceof Timestamp) return date;
    if (date instanceof Date) return Timestamp.fromDate(date);
    if (typeof date === 'string') {
      try {
        return Timestamp.fromDate(new Date(date));
      } catch {
        return Timestamp.now();
      }
    }
    return Timestamp.now();
  }

  private parseFirestoreDate(date?: Timestamp | Date | string | null): string | Date | undefined {
    if (!date) return undefined;
    if (date instanceof Timestamp) return date.toDate();
    if (date instanceof Date) return date;
    return date;
  }

  private isIsoDateString(str: string): boolean {
    return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str);
  }

  private generateRecoveryCode(): string {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  private calculateBoostWeight(tier: BoostTier, boostTime: number): number {
    const hoursPassed = (Date.now() - boostTime) / 3600000;
    const decayRates = {
      Basic: 0.1,
      "Start+": 0.15,
      Advanced: 0.2,
      Premium: 0.25,
      Elite: 0.3,
      GodMode: 0.4,
    };
    return tier.amount * Math.pow(1 - (decayRates[tier.name] || 0.1), hoursPassed);
  }
}