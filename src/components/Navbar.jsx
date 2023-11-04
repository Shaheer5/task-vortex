import React from 'react'
import Vortex from '../assets/vortex.svg';
import { Link } from 'react-router-dom';

// styles
import './Navbar.css'
export default function Navbar() {
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
          <button className="btn">Logout</button>
        </li>
      </ul>

    </nav>
  )
}
