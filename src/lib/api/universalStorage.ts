import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';

export class UniversalStorage {
  async getPost(id: string): Promise<Post | null> {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Post : null;
  }

  async getPosts(): Promise<Post[]> {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  }

  async addPost(post: Omit<Post, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return docRef.id;
  }

  async updatePost(id: string, updates: Partial<Post>): Promise<void> {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, updates);
  }

  async deletePost(id: string): Promise<void> {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
  }

  async votePost(postId: string, userId: string): Promise<void> {
    const postRef = doc(db, 'posts', postId);
    const post = await this.getPost(postId);
    
    if (post?.voters.includes(userId)) {
      await updateDoc(postRef, { voters: arrayRemove(userId) });
    } else {
      await updateDoc(postRef, { voters: arrayUnion(userId) });
    }
  }
}