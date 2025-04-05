import { Book } from '../models/Book';

interface FetchBooksResponse {
  books: Book[];
  totalCount: number;
}

const API_URL = 'https://mission13-openshaw-backend-a9e8degpdqcfgbb2.eastus-01.azurewebsites.net/api/books';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortBy: string,
  ascending: boolean,
  selectedCategory: string
): Promise<FetchBooksResponse> => {
  try {
    const categoryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';

    const response = await fetch(
      `${API_URL}?currentPage=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}&ascending=${ascending}${categoryParam}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (bookId: number, updatedBook: Book): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${bookId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
