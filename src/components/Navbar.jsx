import React from 'react'
import Vortex from '../assets/vortex.svg';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

// styles
import './Navbar.css'
export default function Navbar() {

  const { logout, isPending } = useLogout();
  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <Link to='/' style={{display: "flex"}}>
            <img src={Vortex} alt='vortex-logo' />
            <span>Task Vortex</span>
          </Link>
        </li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li>
          {!isPending && <button className="btn" onClick={logout}>Logout</button>}
          {isPending && <button className="btn" disabled>Loading...</button>}
        </li>
      </ul>

    </nav>
  )
}
