import React, { useState } from 'react'
import './assets/style/register.css'
import register from './assets/img/register.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [library, setLibrary] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('email:', email);
    console.log('password:', password);
    console.log('name:', name);
    console.log('library:', library);
    console.log('phone:', phone);

    // validation checks - phone
    if(phone.length !== 10){
      setError("Phone nmber must be 10 digits long");
      return;
    }

    // validation checks - password
    if(password.length < 4){
      setError("Password length should be minimum of 4 character");
      return;
    }

    let body = {
      email,
      password,
      name,
      libraryName: library,
      contactNumber: phone,
      role: "owner"
    }

    setError("");

    try {
      const res = await axios.post("http://localhost:8080/register", body);
      const data = res.data;
      console.log(data)
      if(data.user.role === 'owner'){
        navigate("/login")
      }
    }
    catch(e) {
      console.log(e)
      let errorText = e?.response?.data?.error || e?.response?.data?.message;
      setError(errorText);
      console.log(e?.response?.data?.error)
    }

    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setLibrary('');
  };
  return (
    <div className="parent-div">

      <div className="left-div">
        <img src={register} alt="login img" />
      </div>

      <div className="main">
        <h1 className="heading">Owner Registration</h1>
        <h3>Enter your credentials</h3>
        <form onSubmit={handleSubmit}>

          <label for="name" className="label-name">Name:</label>
          <input type="text" id="input-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />

          <label for="phone" className="label-phone">Contact Number:</label>
          <input type="tel" id="input-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your Contact Number" required />

          <label for="email" className="label-email">Email:</label>
          <input type="email" pattern=".+@owner.com" size="30" id="input-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@owner.com" required />

          <label for="password" className="label-password">Password:</label>
          <input type="password" id="input-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />

          <label for="library" className="label-library">Library Name:</label>
          <input type="text" id="input-library" value={library} onChange={(e) => setLibrary(e.target.value)} placeholder="Enter your Library Name" required />
          <div className="wrap">
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
        <h4 className='error'>{error}</h4>
      </div>
    </div>
  )
}

export default Register
