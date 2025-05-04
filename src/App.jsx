import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Create from "./pages/create/Create.jsx";
import Project from "./pages/project/Project.jsx";
import { useAuthContext } from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers.jsx";

// styles
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { projectAuth } from "./firebase/config.jsx";
import { setUser, setAuthIsReady } from "./state/user/userSlice.jsx";

function App() {
  // const { authIsReady, user } = useAuthContext();
  const user = useSelector((state) => state.user.user);
  const authIsReady = useSelector((state) => state.user.authIsReady);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      // Transform user object into a plain object
      const plainUser = user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
        : null;

      dispatch(setUser(plainUser));
      dispatch(setAuthIsReady(true));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/" />} />
              <Route path="/project/:id" element={user ? <Project /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
          <ToastContainer />
        </Router>
      )}
    </div>
  );
}

export default App;
