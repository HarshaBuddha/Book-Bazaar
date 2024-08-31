import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId ,fetchReviews}) => {
  const [review, setReview] = useState({
    book_id: bookId,
    rating: 0,
    comment: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/reviews/', review);
      setReview({ book_id: bookId, rating: 0, comment: '' });
      setError(null);
      alert('Review submitted successfully!');
    } catch (error) {
      setError('Error submitting review. Please try again.');
      console.error('Error submitting review:', error);
    }
    fetchReviews()
  };

  return (
    <div className="review-form-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <h2>Leave a Review</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            min="0"
            max="5"
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
