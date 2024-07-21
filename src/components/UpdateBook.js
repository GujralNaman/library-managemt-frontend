import React, { useState } from 'react'
import '../assets/style/updateBook.css'
import update from '../assets/img/update-book2.jpg'
import SideNavbar from './sideNavbar'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = () => {

  const [isbn, setISBN] = useState('');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publisher, setPublisher] = useState('');
  const [version, setVersion] = useState('');
  const [totalCopies, setTotalCopies] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    let { libid } = JSON.parse(localStorage.getItem("user"))

    let body = {isbn:parseInt(isbn), title, authors, publisher, version: parseInt(version), totalCopies: parseInt(totalCopies), availableCopies: parseInt(availableCopies), lib_id: libid }
    const myToken = localStorage.getItem("token");

    console.log(body);
    setError('');

    try {
      const res = await axios.patch("http://localhost:8080/admin/updatebook", body, { headers: { "user": myToken } })
      const data = res.data;
      console.log(data)
      toast.success("Book updated Successfully")
    }
    catch (e) {

      console.log(e)
      let errorText = e?.response?.data?.error || e?.response?.data?.message;
      setError(errorText);
      console.log(e?.response?.data?.error)
    }
    setTitle('');
    setAuthors('');
    setPublisher('');
    setVersion('');
    setTotalCopies('');
    setAvailableCopies('');
    setISBN('');
  }

  return (
    <div className='updatebook-div'>
      <SideNavbar />

      <div className='left-div'>
        <ToastContainer />
        <h1>Hey Admin !</h1>
        <h2>Update the details of the book :)</h2>

        <form className="addBook-form" onSubmit={handleSubmit}>
          <label className='label-title' htmlFor="first">ISBN:</label>
          <input type="number" min="1" id="input-isbn" name="isbn" value={isbn} onChange={(e) => setISBN(e.target.value)} placeholder="Enter ISBN of Book" required />

          <label className='label-title' htmlFor="first">Title:</label>
          <input type="text" id="input-title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter tite of Book" required />

          <label className='label-title' htmlFor="authors">Authors:</label>
          <input type="text" id="input-authors" name="authors" value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="Enter author's name" required />

          <label className='label-title' htmlFor="publisher">Publisher:</label>
          <input type="text" id="input-publisher" name="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Enter Publisher Name" required />

          <label className='label-title' htmlFor="version">Version:</label>
          <input type="number" min="1" id="input-version" name="version" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Enter Book's version" required />

          <label className='label-title' htmlFor="totalCopies">Total Copies:</label>
          <input type="number" min="1" id="input-totalCopies" name="totalCopies" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} placeholder="Enter Book's version" required />

          <label className='label-title' htmlFor="availableCopies">Available Copies:</label>
          <input type="number" min="1" id="input-availableCopies" name="availableCopies" value={availableCopies} onChange={(e) => setAvailableCopies(e.target.value)} placeholder="Enter Book's version" required />

          <div className="wrap"> <button className='submit-btn' type="submit">Submit</button>  </div>
        </form>
        <h4 className='error'>{error}</h4>
      </div>
      <div className='right-div'>
        <img src={update} alt='update book' />
      </div>
    </div>
  )
}

export default UpdateBook
