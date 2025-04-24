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
import { Post } from "@/types/post";

/**
 * Получить все посты из Firestore.
 */
export async function fetchPosts(): Promise<Post[]> {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<Post, "id">;
    return {
      id: docSnap.id,        // id всегда строка
      ...data,
    };
  });
}

/**
 * Добавить новый пост. 
 * Принимает объект без id, возвращает созданный id (строка).
 */
export async function createPost(
  post: Omit<Post, "id">
): Promise<string> {
  // колекция "posts"
  const colRef = collection(db, "posts");
  // добавляем, Firestore сам генерирует строковый ID
  const docRef = await addDoc(colRef, post as DocumentData);
  return docRef.id;         // возвращаем string
}

/**
 * Обновить существующий пост по его строковому id.
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<Post, "id">>
): Promise<void> {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, updates as DocumentData);
}

/**
 * Удалить пост по строковому id.
 */
export async function deletePostById(id: string): Promise<void> {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
}