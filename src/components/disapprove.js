import React, {useState} from 'react'
import Sidenavbar from './sideNavbar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import approve from '../assets/img/disapprove.jpg'

const Disapprove = () => {

    const [reqID, setReqID] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { id } = JSON.parse(localStorage.getItem("user"))
        let body = {reqID: Number(reqID),id};
        const myToken = localStorage.getItem("token");

        console.log(body);
        setError('');

        try {
            const res = await axios.post("http://localhost:8080/admin/disapprove", body, { headers: { "user": myToken } })
            const data = res.data;
            console.log(data)
            toast.success("Request Rejected")
        }
        catch (e) {

            console.log(e)
            let errorText = e?.response?.data?.error || e?.response?.data?.message;
            setError(errorText);
            console.log(e?.response?.data?.error)
        }
        setReqID('');
    }
    return (
        <div className='approve-div'>
            <Sidenavbar />

            <div className='left-div-approval'>
                <img src={approve} alt='approve img' />
            </div>
            <div className='right-div-approval'>
                <ToastContainer />
                <h1>Hey Admin !</h1>
                <h2>There is a new request, Want to Reject ?</h2>

                <form className="createissue-form" onSubmit={handleSubmit}>
                    <label className='label-title' htmlFor="first">Request ID:</label>
                    <input type="number" id="input-req" name="title" value={reqID} onChange={(e) => setReqID(e.target.value)} placeholder="Enter Request ID" required />

                    <div className="wrap"> <button className='submit-btn' type="submit">Submit</button>  </div>
                </form>
                <h4 className='error'>{error}</h4>
            </div>
        </div>
    )
}

export default Disapprove
