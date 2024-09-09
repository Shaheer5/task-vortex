import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { toast } from 'react-toastify';
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../state/user/userSlice";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleError = (err) => {
    setError(err.message);
    setIsPending(false);
    toast.error("Email or Password is Invalid", { autoClose: 2000 });
  };

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      
      await projectFirestore.collection('users').doc(res.user.uid).update({ online: true });

      // Dispatch login action
      // dispatch({ type: "LOGIN", payload: res.user });

      dispatch(setUser(res.user))


      setIsPending(false);
      setError(null);

      toast.success("Logged in successfully", { autoClose: 2000 });
      navigate("/");
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    return () => setIsPending(false); // This will run when the component unmounts
  }, []);

  return { login, isPending, error };
};
