import React from 'react'
import './assets/style/Home.css'
import hero from './assets/img/hero5.jpg';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <>
      <div className="hero-section">
        <div className="left-div">
          <h1 className="top-h1">Online <span> Library</span></h1>
          <h1>Management</h1>
          <h6 className="para">Nothing is pleasanter than<br/> exploring a library . . .</h6>
          <Link to="/register" type="button" className="btn first-btn">Register</Link>
          <Link to="/login" type="button" className="btn second-btn">Login</Link>
        </div>
        <div className="right-div">
          <img src={hero} alt="hero img" />
        </div>
      </div>
    </>

  )
}

export default Home
