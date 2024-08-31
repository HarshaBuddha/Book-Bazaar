import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ title: '', author: '', genre: '' });

  const fetchBooks = async () => {
    try {
      const { title, author, genre } = searchQuery;
      const response = await axios.get('http://localhost:8000/books/search/', {
        params: { title, author, genre },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  return (
    <div className="book-list-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery.title}
          onChange={(e) => setSearchQuery({ ...searchQuery, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by author"
          value={searchQuery.author}
          onChange={(e) => setSearchQuery({ ...searchQuery, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by genre"
          value={searchQuery.genre}
          onChange={(e) => setSearchQuery({ ...searchQuery, genre: e.target.value })}
        />
      </div>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={fetchBooks} onPurchase={fetchBooks} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
