import React, { useState } from 'react'
import '../assets/style/adminDashboard.css'
import SideNavbar from './sideNavbar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reader from '../assets/img/onboard_reader.jpg'

const AdminDashboard = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(phone.length !== 10){
      setError("Phone number must be 10 digits long");
      return;
    }

    if(password.length < 4){
      setError("Password should be minimum of 4 character");
      return;
    }

    let { libid } = JSON.parse(localStorage.getItem("user"))

    let body = { email, password, name, contactNumber: phone, role: "reader", libid }
    const myToken = localStorage.getItem("token");

    console.log(body)
    setError("");
    

    try {
      const res = await axios.post("http://localhost:8080/admin/onboardReader", body, { headers: { "user": myToken } });
      const data = res.data;
      console.log(data)
      toast.success("Reader created Successfully")
    }
    catch (e) {
      
      console.log(e)
      let errorText = e?.response?.data?.error || e?.response?.data?.message;
      setError(errorText);
      console.log(e?.response?.data?.error)
    }

    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
  }
  return (

    <div className='admin-div'>
      <ToastContainer />
      <SideNavbar />

      <div className='left-div-admin'>
        <img src={reader} alt='onboard-reader' />
      </div>

      <div className='right-div-admin'>
        <h1>Hey Admin !</h1>
        <h2>Please Onboard Reader </h2>

        
        <form className="onboard-reader-form" onSubmit={handleSubmit}>
          <label className='label-email-admin' htmlFor="first">Email:</label>
          <input type="email" pattern=".+@reader.com" size="30" id="input-email-admin" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@reader.com" required />

          <label className='label-password-admin' htmlFor="password">Password:</label>
          <input type="password" id="input-password-admin" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />

          <label className='label-phone-admin' htmlFor="contactNumber">Phone Number:</label>
          <input type="tel" pattern="[0-9]{10}" id="input-phone-admin" name="contactNumber" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your Phone Number" required />

          <label className='label-name-admin' htmlFor="Name">Name:</label>
          <input type="text" id="input-name-admin" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />

          <div className="wrap"> <button className='submit-btn-admin' type="submit">Submit</button>  </div>
        </form>
        <h4 className='error'>{error}</h4>
      </div>
    </div>
  )
}

export default AdminDashboard
