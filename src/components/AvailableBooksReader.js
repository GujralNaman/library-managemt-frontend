import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/sideNavbar'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AvailableBookList = () => {
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
            const response = await axios.get(`http://localhost:8080/reader/allbooks/${libid}`, { headers: { "user": myToken } });
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default AvailableBookList