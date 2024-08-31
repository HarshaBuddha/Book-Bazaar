import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PurchaseButton from './PurchaseButton';

const BookCard = ({ book, onDelete, onPurchase }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
            try {
                await axios.delete(`http://localhost:8000/books/${book.id}`);
                onDelete(book.id);
            } catch (error) {
                console.error('Failed to delete the book:', error);
                alert('Error deleting the book.');
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit-book/${book.id}`);
    };

    return (
        <div className={`book-card ${!book.image_url ? 'no-image' : ''}`}>
            {book.image_url && <img src={book.image_url} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Quantity Available: {book.quantity}</p>
            <div className="book-card-buttons">
                <Link to={`/books/${book.id}`}>
                    <button>View Details</button>
                </Link>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                <PurchaseButton book={book} onPurchase={onPurchase} />
            </div>
        </div>
    );
};

export default BookCard;
