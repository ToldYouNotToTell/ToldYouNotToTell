// src/lib/api/universalStorage.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  arrayRemove,
  arrayUnion,             // ← импорт для добавления в массив
} from 'firebase/firestore';
import type { Post, Comment } from '@/types/post';
import { db } from '@/lib/firebase';

export class UniversalStorage {
  private collectionRef = collection(db, 'posts');

  async getPost(id: string): Promise<Post | null> {
    const docRef = doc(this.collectionRef, id);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as Post) : null;
  }

  async getPosts(): Promise<Post[]> {
    const snaps = await getDocs(
      query(this.collectionRef, orderBy('date', 'desc'), limit(100))
    );
    return snaps.docs.map(d => d.data() as Post);
  }

  async addPost(post: Omit<Post, 'id'>): Promise<string> {
    const ref = await addDoc(this.collectionRef, post);
    return ref.id;
  }

  async updatePost(id: string, data: Partial<Post>): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, data);
  }

  async deletePost(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }

  async removeTagFromPost(id: string, tag: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, { tags: arrayRemove(tag) });
  }

  /** Добавить комментарий в поле comments (массив) */
  async addComment(postId: string, comment: Comment): Promise<void> {
    const docRef = doc(this.collectionRef, postId);
    await updateDoc(docRef, {
      comments: arrayUnion(comment),
    });
  }

  /** Удалить комментарий из поля comments (массив) */
  async removeComment(postId: string, comment: Comment): Promise<void> {
    const docRef = doc(this.collectionRef, postId);
    await updateDoc(docRef, {
      comments: arrayRemove(comment),
    });
  }
}
