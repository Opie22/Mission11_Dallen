import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { Book } from "../models/Book";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";


const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("Title");
  const [ascending, setAscending] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
  }, [currentPage, pageSize, sortBy, ascending, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get(`http://localhost:5050/api/books`, {
      params: { currentPage, pageSize, sortBy, ascending, category: selectedCategory }
    });
    setBooks(response.data.books);
  };

  const fetchCategories = async () => {
    const response = await axios.get(`http://localhost:5050/api/books/categories`);
    setCategories(response.data);
  };

  return (
    <div>
      <h2 className="mb-3">Bookstore</h2>

      <Form.Select
        className="mb-3"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </Form.Select>

      <Form.Select onChange={(e) => setSortBy(e.target.value)} className="mb-3" value={sortBy}>
        <option value="Title">Title</option>
        <option value="Author">Author</option>
        <option value="Price">Price</option>
      </Form.Select>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => setAscending(!ascending)} style={{ cursor: "pointer" }}>
              Title {ascending ? "▲" : "▼"}
            </th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Add</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <Button size="sm" onClick={() => addToCart(book)}>Add</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => setCurrentPage(prev => prev + 1)} />
      </Pagination>

      <Form.Select onChange={(e) => setPageSize(Number(e.target.value))} className="mt-3" value={pageSize}>
        <option value="5">5</option>
        <option value="10">10</option>
      </Form.Select>
          <br/>
          <Link to="/cart" className="btn btn-primary mb-3">
            Go to Cart
          </Link>
    </div>

    
  );
};

export default BookList;