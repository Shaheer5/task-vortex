import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx';
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Create from './pages/create/Create.jsx';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css'

function App() {

  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/dashboard" element={user ? <Navigate to="/" /> : <Dashboard />} />
          <Route path="/create" element={user ? <Navigate to="/" /> : <Create />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App
