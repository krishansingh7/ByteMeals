import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import store from "../redux/store";
import { setUser } from "../redux/userSlice";
import { loadCartFromStorage, clearCart } from "../redux/cartSlice";
import { loadOrdersFromStorage, clearOrders } from "../redux/ordersSlice";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Listen to auth state and handle cart persistence
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User logged in — set user in Redux
    store.dispatch(setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }));

    // Restore cart and orders from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      store.dispatch(loadCartFromStorage(JSON.parse(savedCart)));
    }
    
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      store.dispatch(loadOrdersFromStorage(JSON.parse(savedOrders)));
    }
  } else {
    // User logged out — clear everything
    store.dispatch(setUser(null));
    localStorage.removeItem('cart'); // wipe cart on logout
    localStorage.removeItem('orders');
    store.dispatch(clearCart());
    store.dispatch(clearOrders());
  }
});

export { app, auth, db, analytics };
