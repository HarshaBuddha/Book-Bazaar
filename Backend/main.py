from typing import Union
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with the URL of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./books.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Book model for the database
class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String)
    genre = Column(String)
    description = Column(String, nullable=True)
    price = Column(Float)
    available = Column(Boolean, default=True)
    image_url = Column(String, nullable=True)  # New column for storing image URL
    quantity = Column(Integer, default=0)  # New column for storing quantity

    reviews = relationship("Review", back_populates="book")

# Review model for the database
class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey('books.id'))
    rating = Column(Float)
    comment = Column(String, nullable=True)

    book = relationship("Book", back_populates="reviews")

# Create the database tables
Base.metadata.create_all(bind=engine)

# Pydantic models for request and response validation
class BookCreate(BaseModel):
    title: str
    author: str
    genre: str
    description: Optional[str] = None
    price: float
    available: bool = True
    image_url: Optional[str] = None  # New field for image URL
    quantity: int  # New field for quantity

class BookOut(BaseModel):
    id: int
    title: str
    author: str
    genre: str
    description: Optional[str] = None
    price: float
    available: bool
    image_url: Optional[str] = None
    quantity: int

    class Config:
        orm_mode = True

class PurchaseRequest(BaseModel):
    book_id: int
    purchase_quantity: int

class ReviewCreate(BaseModel):
    book_id: int
    rating: float
    comment: Optional[str] = None

class ReviewOut(BaseModel):
    id: int
    book_id: int
    rating: float
    comment: Optional[str] = None

    class Config:
        orm_mode = True

class BookDeleteResponse(BaseModel):
    message: str

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Greet
@app.get("/")
def greet_user():
    return {"message": "Welcome User"}

# Create a new book
@app.post("/books/", response_model=BookOut)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

# Get all books
@app.get("/books/", response_model=List[BookOut])
def get_books(db: Session = Depends(get_db)):
    return db.query(Book).all()

# Get a single book by ID
@app.get("/books/{book_id}", response_model=BookOut)
def get_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book

# Update a book by ID
@app.put("/books/{book_id}", response_model=BookOut)
def update_book(book_id: int, book: BookCreate, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    for key, value in book.dict().items():
        setattr(db_book, key, value)
    db.commit()
    db.refresh(db_book)
    return db_book

# Delete a book by ID
@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(db_book)
    db.commit()
    return {"message": "Book deleted successfully."}

# Search books by title, author, or genre
@app.get("/books/search/", response_model=List[BookOut])
def search_books(title: Optional[str] = None, author: Optional[str] = None, genre: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Book)
    if title:
        query = query.filter(Book.title.ilike(f"%{title}%"))
    if author:
        query = query.filter(Book.author.ilike(f"%{author}%"))
    if genre:
        query = query.filter(Book.genre.ilike(f"%{genre}%"))
    return query.all()

# Create a new review
@app.post("/reviews/", response_model=ReviewOut)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    db_review = Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

# Get all reviews for a book
@app.get("/books/{book_id}/reviews/", response_model=List[ReviewOut])
def get_reviews_for_book(book_id: int, db: Session = Depends(get_db)):
    return db.query(Review).filter(Review.book_id == book_id).all()

# Purchase a book
@app.post("/books/{book_id}/purchase/", response_model=Union[BookOut, BookDeleteResponse])
def purchase_book(book_id: int, purchase_request: PurchaseRequest, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    if db_book.quantity < purchase_request.purchase_quantity:
        raise HTTPException(status_code=400, detail="Not enough quantity available")

    db_book.quantity -= purchase_request.purchase_quantity

    if db_book.quantity == 0:
        db.delete(db_book)
        db.commit()
        return BookDeleteResponse(message="Book has been sold out and deleted.")
    
    db.commit()
    db.refresh(db_book)
    return db_book
