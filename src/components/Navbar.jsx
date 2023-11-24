import React from 'react'
import Vortex from '../assets/vortex.svg';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import './Navbar.css'
export default function Navbar() {

  const { logout, isPending } = useLogout();
  const { user, authIsReady } = useAuthContext();
  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <Link to='/' style={{ display: "flex" }}>
            <img src={Vortex} alt='vortex-logo' />
            <span>Task Vortex</span>
          </Link>
        </li>

        {!user &&
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>}
        {user &&
          <li>
            {!isPending && <button className="btn btn-primary" onClick={logout}>Logout</button>}
            {isPending && <button className="btn btn-secondary" disabled>Loading...</button>}
          </li>}
      </ul>
          <hr />
    </nav>
  )
}
