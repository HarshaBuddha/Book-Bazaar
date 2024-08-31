
---

### Book Bazaar

**Book Bazaar** is an open-source book platform that allows users to freely manage and explore a collection of books. Users can:

- **Add Books**: Submit details of new books, including the ability to upload book images via URL.
- **Edit and Delete Books**: Update or remove book entries as needed.
- **Purchase Books**: Simulate the purchase process for books listed on the platform.
- **View and Review Books**: Browse the catalog, view book details, and leave reviews.

The project is built using a React frontend and a FastAPI backend, ensuring a smooth and responsive user experience.

---

### Running the Frontend

1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
4. **Access the Frontend**: Open your browser and go to `http://localhost:3000` to use the application.

---

### Running the Backend

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```
2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Start the Backend Server**:
   ```bash
   uvicorn main:app --reload
   ```
4. **Access the API**: The backend API will be running at `http://localhost:8000`.

---

### Usage

Once both the frontend and backend servers are running, you can interact with **Book Bazaar** as follows:

1. **Homepage**: Start by visiting the homepage, where you can browse the available books.

2. **Adding a Book**:
   - Navigate to the "Add Book" page.
   - Fill in the book details, including the title, author, description, and an image URL for the book cover.
   - Submit the form to add the book to the catalog.

3. **Viewing Book Details**:
   - Click on any book in the list to view its detailed information.
   - Here, you can see the description, reviews, and options to edit or delete the book if you're the one who added it.

4. **Editing a Book**:
   - On the book detail page, select the "Edit" option.
   - Modify any details as needed and save your changes.

5. **Deleting a Book**:
   - If you wish to remove a book, select the "Delete" option on the book detail page.

6. **Purchasing a Book**:
   - On the book detail page, click the "Purchase" button to simulate buying the book.

7. **Leaving a Review**:
   - Add your thoughts by leaving a review on any book's detail page.
   - Provide a rating and a comment, then submit to share your feedback.

8. **Responsive Experience**:
   - Enjoy a fully responsive UI, with dark purple and complementary colors, ensuring a consistent and visually appealing experience across devices.

---
### Contributing
Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request with your changes.