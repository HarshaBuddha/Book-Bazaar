import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/image.png";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="logo-container">
                <img src={Logo} alt="BookBazaar" />
                <h2>BookBazaar</h2>
            </div>
            <nav>
                <ul className="nav">
                    <li>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/books" className="nav-link">
                            Books List
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-book" className="nav-link">
                            Add Book
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
