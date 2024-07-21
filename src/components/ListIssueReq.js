import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/style/listissue.css';
import SideNavbar from './sideNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListIssueReq = () => {
    const [error, setError] = useState('');
    const [requests, setRequests] = useState([]);

    const libid = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).libid : null;
    const myToken = localStorage.getItem('token')
    let { id } = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (libid) {
            fetchRequests();
        }
    }, [libid]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/requests/${libid}`, { headers: { "user": myToken } });
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const ApproveClick = async (reqID) => {
        let body = { reqID: Number(reqID), id };
        try {
            const res = await axios.post("http://localhost:8080/admin/approvedisapprove", body, { headers: { "user": myToken } })
            const data = res.data;
            console.log(data)
            // window.location.reload();
            toast.success("Book Approved Successfully")
            
        }
        catch (e) {

            console.log(e)
            let errorText = e?.response?.data?.error || e?.response?.data?.message;
            setError(errorText);
            console.log(e?.response?.data?.error)
        }
    }

    const DisapproveClick = async (reqID) => {
        let body = { reqID: Number(reqID), id };
        try {
            const res = await axios.post("http://localhost:8080/admin/disapprove", body, { headers: { "user": myToken } })
            const data = res.data;
            console.log(data)
            toast.success("Request Rejected")
            window.location.reload();
        }
        catch (e) {

            console.log(e)
            let errorText = e?.response?.data?.error || e?.response?.data?.message;
            setError(errorText);
            console.log(e?.response?.data?.error)
            alert({error})
        }
    }

    return (
        <div className='list-div'>
            <SideNavbar />
            <table>
                <ToastContainer />
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Reader ID</th>
                        <th>Request Date</th>
                        <th>Request Type</th>
                        <th>Approval Date</th>
                        <th>Reject Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.reqID}>
                            <td>{request.reqID}</td>
                            <td>{request.readerID}</td>
                            <td>{request.requestdate}</td>
                            <td>{request.requestType}</td>
                            <td>{request.approvalDate}</td>
                            <td>{request.rejectDate}</td>
                            <td>
                                <button onClick={() => ApproveClick(request.reqID)}><i className="fa-regular fa-thumbs-up"></i></button>
                                <button onClick={() => DisapproveClick(request.reqID)}><i className="fa-regular fa-thumbs-down"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default ListIssueReq;