import React from 'react';
import '../assets/style/sideNavbar.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

const SideNav = (props) => {

  const Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Navigate("/login")
  }
  return (
    <div className='sidenav'>
      <Link className='nav-item nav' to="/">Home</Link>
      {user.role === "admin" && <Link className='nav-item nav' to="/adminDashboard">Onboard Reader</Link>}
      {user.role === "admin" && <Link className='nav-item nav' to="/createbookinventory">Add a new Book</Link>}
      {user.role === "admin" && <Link className='nav-item nav' to="/updateBook">Update Book Details</Link>}
      {user.role === "admin" && <Link className='nav-item nav' to="/approvedisapprove">Approve Request</Link>}
      {user.role === "admin" && <Link className='nav-item nav' to="/disapprove">Disapprove Request</Link>}
      {user.role === "admin" && <Link className='nav-item nav' to="/deleteBook">Delete Book</Link>}
      {user.role === "admin" && <Link className='nav-item nav' to="/listissue">Check Issue Requests</Link>}
      {user.role === "admin" && <Link className='nav-item nav' to="/listbooks">Available Books</Link>}

      {user.role === "reader" && <Link className='nav-item' to="/searchbook">Search Book</Link>}
      {user.role === "reader" && <Link className='nav-item' to="/availablebooks">Available Books</Link>}
      {user.role === "reader" && <Link className='nav-item' to="/createissuerequest">Create Request</Link>}

      <button type='submit' className='nav-btn' onClick={logout}>Logout
        <i className="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
)};

export default SideNav;