import axios from "axios";
import { Book } from "../models/Book";


const API_URL = "http://localhost:5050/api/books";


export const fetchBooks = async (page: number, pageSize: number, sortBy: string, ascending: boolean) => {
    const response = await axios.get<Book[]>(API_URL, {
        params: { page, pageSize, sortBy, ascending }
    });
    return response.data;
};
