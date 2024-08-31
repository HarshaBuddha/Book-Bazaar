import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    price: 0,
    available: true,
    image_url: '',
    quantity: 1,   // Default to 1 to ensure it's available
  });

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/books/${bookId}`);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = bookId ? 'PUT' : 'POST';
      const url = bookId ? `http://localhost:8000/books/${bookId}` : 'http://localhost:8000/books/';

      const updatedBook = {
        ...book,
        available: book.quantity > 0,
      };

      await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: updatedBook,
      });
      alert(bookId ? 'Book updated successfully!' : 'Book created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Error saving the book.');
    }
  };

  return (
<div className="container">
  <form className="book-form" onSubmit={handleSubmit}>
    <h1>{bookId ? 'Edit Book' : 'Add Book'}</h1>
    <label>
      Title:
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Enter book title"
        required
      />
    </label>
    <label>
      Author:
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Enter author's name"
        required
      />
    </label>
    <label>
      Genre:
      <input
        type="text"
        name="genre"
        value={book.genre}
        onChange={handleChange}
        placeholder="Enter book genre"
        required
      />
    </label>
    <label>
      Description:
      <textarea
        name="description"
        value={book.description}
        onChange={handleChange}
        placeholder="Enter a brief description"
      />
    </label>
    <label>
      Price:
      <input
        type="number"
        name="price"
        value={book.price}
        onChange={handleChange}
        placeholder="Enter price"
        required
      />
    </label>
    <label>
      Image URL:
      <input
        type="text"
        name="image_url"
        value={book.image_url}
        onChange={handleChange}
        placeholder="Enter image URL"
      />
    </label>
    <label>
      Quantity:
      <input
        type="number"
        name="quantity"
        value={book.quantity}
        onChange={handleChange}
        placeholder="Enter quantity"
        min="0"
        required
      />
    </label>
    <button type="submit">Save</button>
  </form>
</div>

  );
};

export default BookForm;
