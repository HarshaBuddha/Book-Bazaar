import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PurchaseButton = ({ book, onPurchase }) => {
    const navigate = useNavigate();

    const handlePurchase = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/books/${book.id}/purchase/`, {
                book_id: book.id,
                purchase_quantity: 1
            });

            if (response.data.message === "Book has been sold out and deleted.") {
                alert('Book purchased successfully and it has been sold out!');
                navigate('/books'); 
            } else {
                alert('Book purchased successfully!');
                onPurchase(); 
            }
        } catch (error) {
            console.error('Failed to purchase the book:', error.response ? error.response.data : error.message);
            alert('Error purchasing the book.');
        }
    };

    return (
        <button class="purchase-button" onClick={handlePurchase} disabled={book.quantity <= 0}>
            Purchase
        </button>
    );
};

export default PurchaseButton;
