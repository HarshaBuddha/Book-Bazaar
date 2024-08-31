import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookForm from './components/BookForm';
import BookDetail from './pages/BookDetail';
import BookList from './pages/BookList';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/NavBar';
import './styles/global.css'; 

const App = () => {
  return (
    <div>
    
    <Router>
      <div className="app-container">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/edit-book/:bookId" element={<BookForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;
