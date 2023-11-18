import { useEffect, useState } from "react";
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config";
import { toast } from 'react-toastify';
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Couldn't complete signup");
      }

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = projectStorage.ref(uploadPath);

      try {
        const snapshot = await storageRef.put(thumbnail);
        var imgUrl = await snapshot.ref.getDownloadURL();
        console.log("Image uploaded successfully. Download URL:", imgUrl);
      } catch (error) {
        console.error("Error uploading image:", error.message);
        throw new Error("Error uploading image");
      }

      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      toast.success("Account created successfully", { autoClose: 2000 });
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setIsPending(false);
      toast.error(err.message, { autoClose: 2000, type: 'error' });
    }
  };

  useEffect(() => {
    return () => setIsPending(false); // This will run when the component unmounts
  }, []);

  return { signup, error, isPending };
};
