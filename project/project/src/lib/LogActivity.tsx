// utils/logActivity.ts
import { db, auth } from "..//lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Logs a user activity into Firestore
 * @param action - The action performed (e.g. "created course", "deleted user")
 */
export const logActivity = async (action: string) => {
  try {
    const user = auth.currentUser;
    const userName = user?.displayName || user?.email || "Unknown User";

    await addDoc(collection(db, "activityLogs"), {
      user: userName,
      action,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
