import React, { useState } from 'react'
import '../assets/style/deleteBook.css'
import SideNavbar from './sideNavbar'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Delete from '../assets/img/delete.jpg'

const DeleteBook = () => {

  const [isbn, setISBN] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    const myToken = localStorage.getItem("token");
    console.log(myToken)
    let body = { isbn:parseInt(isbn) }

    console.log(body);
    setError('');

    try {
      const res = await axios.delete(`http://localhost:8080/admin/deletebook/${isbn}`, { headers: { "user": myToken } })
      const data = res.data;
      console.log(data)
      toast.success("Book deleted Successfully")
      window.location.reload();
    }
    catch (e) {

      console.log(e)
      let errorText = e?.response?.data?.error || e?.response?.data?.message;
      setError(errorText);
      console.log(e?.response?.data?.error)
    }
    setISBN('');
  }

  return (
    <div className='delete-div'>
      <SideNavbar />
      <div className='left-div'>
        <img src={Delete} alt='delete book' />
      </div>
      <div className='right-div'>
        <ToastContainer />
  
        <h1>Hey Admin !</h1>
        <h2>Do you want to delete a book ?</h2>
        <p>Delete a book by just adding the isbn</p>
  
        <form className="deleteBook-form" onSubmit={handleSubmit}>
          <label className='label-title' htmlFor="first">ISBN:</label>
          <input type="number" id="input-isbn" name="isbn" value={isbn} onChange={(e) => setISBN(e.target.value)} placeholder="Enter ISBN of Book" required />
  
          <div className="wrap"> <button className='submit-btn' type="submit">Submit</button>  </div>
        </form>
        <h4 className='error'>{error}</h4>
      </div>
    </div>
  )
}

export default DeleteBook
