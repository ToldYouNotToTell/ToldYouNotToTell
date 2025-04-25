// src/lib/api/universalStorage.ts
import { 
  collection, doc, getDoc, getDocs, addDoc, 
  updateDoc, deleteDoc, query, orderBy, limit,
  arrayUnion, arrayRemove 
} from 'firebase/firestore';
import { Post, Comment } from '@/types/post';
import { db } from '@/lib/firebase';

export class UniversalStorage {
  private postsRef = collection(db, 'posts');

  async getPost(id: string): Promise<Post | null> {
    const snap = await getDoc(doc(this.postsRef, id));
    return snap.exists() ? { id: snap.id, ...snap.data() } as Post : null;
  }

  async getPosts(): Promise<Post[]> {
    const snaps = await getDocs(
      query(this.postsRef, orderBy('date', 'desc'), limit(100))
    );
    return snaps.docs.map(d => ({ id: d.id, ...d.data() } as Post));
  }

  async addPost(post: Omit<Post, 'id'>): Promise<string> {
    const ref = await addDoc(this.postsRef, post);
    return ref.id;
  }

  async updatePost(id: string, data: Partial<Post>): Promise<void> {
    await updateDoc(doc(this.postsRef, id), data);
  }

  async deletePost(id: string): Promise<void> {
    await deleteDoc(doc(this.postsRef, id));
  }

  async addComment(postId: string, comment: Comment): Promise<void> {
    await updateDoc(doc(this.postsRef, postId), {
      comments: arrayUnion({
        ...comment,
        id: comment.id || Date.now().toString(),
      }),
    });
  }

  async removeComment(postId: string, commentId: string): Promise<void> {
    const post = await this.getPost(postId);
    if (!post) return;
    
    const comment = post.comments.find(c => c.id === commentId);
    if (comment) {
      await updateDoc(doc(this.postsRef, postId), {
        comments: arrayRemove(comment),
      });
    }
  }
}