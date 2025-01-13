import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const userStatus = document.getElementById("user-status");
  if (user) {
    userStatus.textContent = `Logged in as: ${user.email}`;
  } else {
    userStatus.textContent = "No user logged in";
  }
});

document.getElementById("signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign up successful!");
    console.log("User created:", userCredential.user);
  } catch (error) {
    alert(`Sign up failed: ${error.message}`);
    console.error("Error signing up:", error);
  }
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    alert(`Login failed: ${error.message}`);
    console.error("Error logging in:", error);
  }
});

document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    console.log("User logged out");
  } catch (error) {
    alert(`Logout failed: ${error.message}`);
    console.error("Error logging out:", error);
  }
});
