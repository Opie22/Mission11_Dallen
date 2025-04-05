import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import { Book } from "../models/Book";

const defaultBook: Book = {
  bookID: 0,
  title: "",
  author: "",
  publisher: "",
  isbn: "",
  classification: "",
  category: "",
  pageCount: 0,
  price: 0
};

const AdminBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookForm, setBookForm] = useState<Book>({ ...defaultBook });
  const [editingBookID, setEditingBookID] = useState<number | null>(null);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:5050/api/books/all");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookForm(prev => ({
      ...prev,
      [name]: name === "pageCount" || name === "price" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBookID !== null) {
        await axios.put(`http://localhost:5050/api/books/${editingBookID}`, bookForm);
      } else {
        await axios.post("http://localhost:5050/api/books", bookForm);
      }

      setBookForm({ ...defaultBook });
      setEditingBookID(null);
      fetchBooks();
    } catch (error) {
      console.error("Failed to save book:", error);
    }
  };

  const handleEdit = (book: Book) => {
    setBookForm(book);
    setEditingBookID(book.bookID);
  };

  const handleCancelEdit = () => {
    setBookForm({ ...defaultBook });
    setEditingBookID(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5050/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Book Management</h2>

      <Form onSubmit={handleSubmit}>
        <Row className="gx-2">
          <Col md={3}><Form.Control name="title" value={bookForm.title} onChange={handleChange} placeholder="Title" required /></Col>
          <Col md={3}><Form.Control name="author" value={bookForm.author} onChange={handleChange} placeholder="Author" required /></Col>
          <Col md={3}><Form.Control name="publisher" value={bookForm.publisher} onChange={handleChange} placeholder="Publisher" required /></Col>
          <Col md={3}><Form.Control name="isbn" value={bookForm.isbn} onChange={handleChange} placeholder="ISBN" required /></Col>
        </Row>
        <Row className="gx-2 mt-2">
          <Col md={3}><Form.Control name="classification" value={bookForm.classification} onChange={handleChange} placeholder="Classification" required /></Col>
          <Col md={3}><Form.Control name="category" value={bookForm.category} onChange={handleChange} placeholder="Category" required /></Col>
          <Col md={3}><Form.Control type="number" name="pageCount" value={bookForm.pageCount} onChange={handleChange} placeholder="Pages" required /></Col>
          <Col md={3}><Form.Control type="number" step="0.01" name="price" value={bookForm.price} onChange={handleChange} placeholder="Price" required /></Col>
        </Row>
        <div className="mt-3 d-flex gap-2">
          <Button type="submit" variant="success">
            {editingBookID !== null ? "Update Book" : "Add Book"}
          </Button>
          {editingBookID !== null && (
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </Form>

      <hr />

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th>
            <th>Category</th><th>Pages</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => handleEdit(book)}>Edit</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleDelete(book.bookID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminBooks;
