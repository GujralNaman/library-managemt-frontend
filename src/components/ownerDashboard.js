import React, { useState } from 'react'
import '../assets/style/ownerDashboard.css'
import onboard from '../assets/img/onboard-admin.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OwnerDashboard = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone.length !== 10) {
            toast.error("Phone number must be 10 digits long");
            return;
        }

        if (password.length < 4) {
            toast.error("Password should be minimum of 4 character");
            return;
        }

        let { libid } = JSON.parse(localStorage.getItem("user"))

        let body = { email, password, name, contactNumber: phone, role: "admin", libid }
        const myToken = localStorage.getItem("token");

        console.log(body)

        try {
            const res = await axios.post("http://localhost:8080/owner/onboardAdmin", body, { headers: { "user": myToken } });
            const data = res.data;
            console.log(data)
            toast.success("Admin created Successfully")
        } catch (e) {
            console.log(e)
        }

        setEmail('');
        setPassword('');
        setName('');
        setPhone('');

    }

    const handlelogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }

    return (

        <div className='owner-div'>
            <ToastContainer />

            <div className='left-div'>
                <h1>Hey owner !</h1>
                <h2>Please Onboard Admin </h2>

                <form className="onboard-admin-form" onSubmit={handleSubmit}>
                    <label className='label-email' htmlFor="first">Email:</label>
                    <input type="email" pattern=".+@admin.com" size="30" id="input-email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@admin.com" required />

                    <label className='label-password' htmlFor="password">Password:</label>
                    <input type="password" id="input-password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />

                    <label className='label-phone' htmlFor="contactNumber">Phone Number:</label>
                    <input type="tel" id="input-phone" name="contactNumber" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your Phone Number" required />

                    <label className='label-name' htmlFor="Name">Name:</label>
                    <input type="text" id="input-name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />

                    <div className="wrap"> <button className='submit-btn' type="submit">Submit</button>  </div>
                </form>
            </div>

            <div className='right-div'>
                <button className='logout' type='submit' onClick={handlelogout}>Log out</button>
                <img src={onboard} alt="onboard-admin" />
            </div>
        </div>
    )
}

export default OwnerDashboard
