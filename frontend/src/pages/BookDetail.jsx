import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import axios from 'axios';
import PurchaseButton from '../components/PurchaseButton';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/books/${bookId}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/books/${bookId}/reviews/`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail">
      <img src={book.image_url} alt={book.title} />
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Quantity Available:</strong> {book.quantity}</p>

      <PurchaseButton book={book} onPurchase={() => fetchBook()}  />

      <h2>Reviews</h2>
      <ul className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <strong>Rating:</strong> {review.rating} / 5
              <p>{review.comment}</p>
            </li>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </ul>

      <ReviewForm bookId={book.id} fetchReviews={fetchReviews}/>
    </div>
  );
};

export default BookDetail;
