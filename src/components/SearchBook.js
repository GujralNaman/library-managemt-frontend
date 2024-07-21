import React, { useState } from 'react';
import axios from 'axios';
import Sidenavbar from './sideNavbar'
import '../assets/style/searchBook.css';

const SearchBook = () => {
    const [searchbar, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [qrCodeImage, setQRCodeImage] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async (e) => {

        e.preventDefault();
        let body = { query: searchbar.toLowerCase() };
        const myToken = localStorage.getItem("token");

        try {
            const res = await axios.post('http://localhost:8080/reader/searchbook', body, {
                headers: { "user": myToken }
            });
            const data = res.data;

            if (data) {
                const bookInfo = data;
                setSearchResults([bookInfo]);
                var baseUrl = 'http://localhost:8080/';
                var qrCodeRelativeUrl = data.qr_code_url;
                var finalUrl = baseUrl + qrCodeRelativeUrl;

                if (finalUrl) {
                    setQRCodeImage(finalUrl);
                } else {
                    console.error('QR code not found.');
                }
                setError(null);
            } else {
                setError('No books found');
                setSearchResults(null);
            }
        } catch (error) {
            console.log("Error:", error);
            if(searchbar === ''){
              setError('Input field is empty') 
            }
            else{
                setError('Sorry, Book not found');
            }
            setSearchResults(null);
        }
    };

    return (
        <div className='search-div'>
            <Sidenavbar />
            <div className='searchbar'>
                <input type="search" className='bar' placeholder="Search.." value={searchbar} onChange={(e) => setSearch(e.target.value)} />
                <button className='icon-btn' onClick={handleClick}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            {error && <p className="error">{error}</p>}
            {searchResults && (
                <div className="search-results row">
                    <h2>Search Results:</h2>
                    <div className='column'>
                        <div className='card'>
                            <h4>Title: {searchResults[0].book.title}</h4>
                            <h4>Authors: {searchResults[0].book.authors}</h4>
                            <h4>Publisher: {searchResults[0].book.publisher}</h4>
                            <h4>Version: {searchResults[0].book.version}</h4>
                            <h4>Total Copies: {searchResults[0].book.totalCopies}</h4>
                            <h4>Available Copies: {searchResults[0].book.availableCopies}</h4>
                            <h4>ISBN: {searchResults[0].book.isbn}</h4>
                            {qrCodeImage && <img src={qrCodeImage} alt='qr-img' className='qrImg' />}
                        </div>
                        <div id='qr-code-container'></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBook;