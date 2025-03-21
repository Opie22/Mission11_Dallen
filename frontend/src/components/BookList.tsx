import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination, Form } from "react-bootstrap";
import { Book } from "../models/Book";


const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState("Title");
    const [ascending, setAscending] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, [page, pageSize, sortBy, ascending]);

    const fetchBooks = async () => {
        const response = await axios.get(`http://localhost:5050/api/books`, {
            params: { page, pageSize, sortBy, ascending }
        });
        setBooks(response.data);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Bookstore</h2>

            <Form.Select onChange={(e) => setSortBy(e.target.value)}>
                <option value="Title">Title</option>
                <option value="Author">Author</option>
                <option value="Price">Price</option>
            </Form.Select>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => setAscending(!ascending)}>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Pages</th>
                        <th>Price</th>
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
                            <td>{book.PageCount}</td>
                            <td>${book.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={() => setPage(prev => Math.max(1, prev - 1))} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(prev => prev + 1)} />
            </Pagination>

            <Form.Select onChange={(e) => setPageSize(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
            </Form.Select>
        </div>
    );
};

export default BookList;
