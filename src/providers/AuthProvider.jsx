import { AuthContext } from "../contexts/AuthContext";
import PropTypes from "prop-types";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axe = useAxios();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logInGoogle = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, googleProvider);
    const newUser = {
      email: res.user.email,
      name: res.user.displayName,
      image: res.user.photoURL,
      createdAt: new Date().toISOString(),
    };
    const result = await axe.post("/users", newUser);
    console.log(result);
  };

  const authInfo = {
    user,
    logOut,
    logInGoogle,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
