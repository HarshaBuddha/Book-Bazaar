import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to The Book Bazaar</h1>
      <div className="home-buttons">
        <Link to="/books">
          <button>Browse Books</button>
        </Link>
        <Link to="/add-book">
          <button>Add a New Book</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
