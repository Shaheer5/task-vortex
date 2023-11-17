import { useEffect, useState } from "react"
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config"
import { toast } from 'react-toastify';
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Couldn't complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL(); 

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({ 
        online: true,
        displayName,
        photoURL: imgUrl,
      })

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user })

      // updating state if the component is unmounted
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        toast.success("Account created successfully", { autoClose: 2000 });
        navigate("/");
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
        toast(err.message, { autoClose: 2000, type: 'error' });
      }
    }
  }

    // cleanup function
    useEffect(() => {
      return () => setIsCancelled(true);
    }, []);

  return { signup, error, isPending };
}
