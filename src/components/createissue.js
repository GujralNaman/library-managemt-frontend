import React, { useState } from 'react'
import '../assets/style/createissue.css'
import Sidenavbar from './sideNavbar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IssueReq from '../assets/img/create-issue.jpg'

const Createissue = () => {

    const [isbn, setISBN] = useState('');
    const [reqType, setType] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { id } = JSON.parse(localStorage.getItem("user"))

        let body = { bookID: parseInt(isbn), readerID:id, requestType:reqType}
        const myToken = localStorage.getItem("token");

        console.log(body);
        setError('');

        try {
            const res = await axios.post("http://localhost:8080/reader/createissue", body, { headers: { "user": myToken } })
            const data = res.data;
            console.log(data)
            if(reqType === "issue"){
                toast.success("Issue Request created successfully")
            }
            else{
                toast.success("Return Request placed successfully")
            }
        }
        catch (e) {

            console.log(e)
            let errorText = e?.response?.data?.error || e?.response?.data?.message;
            setError(errorText);
            console.log(e?.response?.data?.error)
        }
        setISBN('');
        setType('');
    }

    return (
        <div className='createissue-div'>
            <Sidenavbar />
            <div className='left-div'>
                <img src={IssueReq} alt='create issue request' />
            </div>
            <div className='right-div'>
                <ToastContainer />
                <h1 className='issue-head'>Hey Reader !</h1>
                <h2 className='issue-head'>Raise enquiry against the book .</h2>

                <form className="createissue-form" onSubmit={handleSubmit}>
                    <label className='label-title' htmlFor="first">Book ID:</label>
                    <input type="number" min="1" id="input-isbn" name="title" value={isbn} onChange={(e) => setISBN(e.target.value)} placeholder="Enter ISBN of Book" required />

                    <label htmlFor="label-title" className='label-title'>Request Type:</label>
                    <select name="reqType" id="reqType" value={reqType} onChange={(e) => setType(e.target.value)} required>
                        <option value="" defaultValue>Select</option>
                        <option value="issue">Issue</option>
                        <option value={"return"}>Return</option>
                    </select>

                    <div className="wrap"> <button className='submit-btn' type="submit">Submit</button>  </div>
                </form>
                <h4 className='error'>{error}</h4>
            </div>
        </div>
    )
}

export default Createissue
