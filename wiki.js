import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const pagesRef = collection(db, "wikiPages");

// CREATE PAGE + VERSION HISTORY
export async function createPage(title, content) {
  const user = auth.currentUser;

  await addDoc(pagesRef, {
    title,
    content,
    author: user.email,
    createdAt: Date.now(),
    history: [
      {
        content,
        editedBy: user.email,
        time: Date.now()
      }
    ]
  });
}

// LOAD PAGES
export async function loadPages(callback) {
  const snapshot = await getDocs(pagesRef);

  const pages = [];
  snapshot.forEach(doc => {
    pages.push({ id: doc.id, ...doc.data() });
  });

  callback(pages);
}

// UPDATE PAGE (WITH VERSION HISTORY)
export async function updatePage(id, newContent) {
  const user = auth.currentUser;
  const ref = doc(db, "wikiPages", id);

  const snap = await getDoc(ref);
  const data = snap.data();

  const newHistory = data.history || [];

  newHistory.push({
    content: newContent,
    editedBy: user.email,
    time: Date.now()
  });

  await updateDoc(ref, {
    content: newContent,
    history: newHistory
  });
}
