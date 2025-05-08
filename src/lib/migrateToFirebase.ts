import { doc, setDoc } from "firebase/firestore";

import { db, auth } from "@/lib/firebase";

export const migrateLocalToFirebase = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const keysToMigrate = [
    "posts",
    "userVotes",
    "commentAuthors",
    "reports",
  ];

  for (const key of keysToMigrate) {
    const data = localStorage.getItem(key);
    if (data) {
      await setDoc(
        doc(db, "users", user.uid),
        {
          [key]: JSON.parse(data),
        },
        { merge: true },
      );
    }
  }
};
