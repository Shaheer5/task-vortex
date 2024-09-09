import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user/userSlice";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const { dispatch, user } = useAuthContext();
  const dispatch = useDispatch()

  const handleError = (err) => {
    console.log(err.message);
    setError(err.message);
    setIsPending(false);
    toast.error("Logout unsuccessful", { autoClose: 2000 });
  };

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      // updating online status to offline

      // const { uid } = user;
      const { uid } = projectAuth.currentUser;

      await projectFirestore.collection("users").doc(uid).update({ online: false });

      await projectAuth.signOut();

      // dispatch logout action
      // dispatch({ type: "LOGOUT" });

      dispatch(setUser(null))


      setIsPending(false);  
      setError(null);
      toast.success("Logged out successfully", { autoClose: 2000 });
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    return () => setIsPending(false); // This will run when the component unmounts
  }, []);

  return { logout, error, isPending };
};
