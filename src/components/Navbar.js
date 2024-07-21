import React from 'react'
import '../assets/style/navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="topnav">
            <Link to="#" className='con'>Contact</Link>
            <Link to="#">About</Link>
        </div>
    )
}

export default Navbar
