import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/sideNavbar'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const BookList = () => {
    const [error, setError] = useState('');
    const [books, setBooks] = useState([]);
    const myToken = localStorage.getItem('token')
    const libid = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).libid : null;

    useEffect(() => {
        if (libid) {
            fetchRequests();
        }
    }, [libid]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/allbooks/${libid}`, { headers: { "user": myToken } });
            // const response = await axios.get(`http:localhost:8080/allbooks/${libid}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const DeleteClick = async (isbn) => {

        try {
            const res = await axios.delete(`http://localhost:8080/admin/deletebook/${isbn}`, { headers: { "user": myToken } })
            const data = res.data;
            console.log(data)
            toast.success("Book deleted Successfully")
        }
        catch (e) {

            console.log(e)
            let errorText = e?.response?.data?.error || e?.response?.data?.message;
            setError(errorText);
            console.log(e?.response?.data?.error)
            alert(error);
        }
    }

    return (
        <div className='list-div'>
            <SideNavbar />
            <table>
                <ToastContainer />
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Publisher</th>
                        <th>Version</th>
                        <th>Total Copies</th>
                        <th>Available Copies</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>{book.authors}</td>
                            <td>{book.publisher}</td>
                            <td>{book.version}</td>
                            <td>{book.totalCopies}</td>
                            <td>{book.availableCopies}</td>
                            <td>
                                <button onClick={() => DeleteClick(book.isbn)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default BookList