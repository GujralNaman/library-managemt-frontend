import './App.css';
import Home from './Home';
import Navbar from './components/Navbar';
import Login from './Login'
import Register from './Register'
import ErrorPage from './components/ErrorPage'
import OwnerDashboard from './components/ownerDashboard'
import AdminDashboard from './components/adminDashboard'
import AddBook from './components/addBook'
import BookList from './components/BookList';
import ListIssue from './components/ListIssueReq'
import UpdateBook from './components/UpdateBook'
import DeleteBook from './components/deleteBook'
import ApproveDisapprove from './components/approvedisapprove'
import Disapprove from './components/disapprove'

import CreateIssue from './components/createissue'
import SearchBook from './components/SearchBook'
import AvailableBookReader from './components/AvailableBooksReader'


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/ownerDashboard" element={<OwnerDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/listissue" element={<ListIssue />} />
        <Route path="/listbooks" element={<BookList />} />
        <Route path="/createbookinventory" element={<AddBook />} />
        <Route path="/updateBook" element={<UpdateBook />} />
        <Route path="/approvedisapprove" element={<ApproveDisapprove />} />
        <Route path="/disapprove" element={<Disapprove />} />
        <Route path="/deleteBook" element={<DeleteBook />} />

        <Route path="/createissuerequest" element={<CreateIssue />} />
        <Route path="/searchbook" element={<SearchBook />} />
        <Route path="/availablebooks" element={<AvailableBookReader />} />
      </Routes>
    </Router>
  );
}

export default App;