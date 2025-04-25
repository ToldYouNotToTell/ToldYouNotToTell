// src/lib/api/posts.ts
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Post, Comment } from "@/types/post";

export async function fetchPosts(): Promise<Post[]> {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Post, "id">),
    comments: (docSnap.data().comments || []).map((c: any) => ({
      id: String(c.id),
      text: c.text,
      authorId: c.authorId,
      date: c.date || new Date().toISOString(),
    })),
  }));
}

export async function createPost(post: Omit<Post, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "posts"), post as DocumentData);
  return docRef.id;
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<void> {
  await updateDoc(doc(db, "posts", id), updates as DocumentData);
}

export async function deletePostById(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id));
}