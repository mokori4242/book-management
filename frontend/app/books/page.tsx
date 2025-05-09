'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookCard from '../_components/books/bookCard';

// 書籍データ（サンプル）
const BOOKS = [
  { id: 1, title: 'THE BOOK LIFE', isbn: '80887', author: 'AUTHOR' },
  { id: 2, title: 'THE BONN LIFE', isbn: '40647', author: 'AUTHOR' },
  { id: 3, title: 'THE BOOK\'S INDS', isbn: '43787', author: 'AUTHOR' },
  { id: 4, title: 'THE BOOK LIFE', isbn: '40831', author: 'AUTHOR' },
  { id: 5, title: 'THE BOOK LIFE', isbn: '30977', author: 'AUTHOR' },
  { id: 6, title: 'THE BOOK LIFE', isbn: '80210', author: 'AUTHOR' },
  { id: 7, title: 'THE BOOK LIFE', isbn: '90210', author: 'AUTHOR' },
  { id: 8, title: 'THE BOOK LIFE', isbn: '10293', author: 'AUTHOR' },
  { id: 9, title: 'THE BOOK LIFE', isbn: '38475', author: 'AUTHOR' },
  { id: 10, title: 'THE BOOK LIFE', isbn: '58392', author: 'AUTHOR' },
  { id: 11, title: 'THE BOOK LIFE', isbn: '29384', author: 'AUTHOR' },
  { id: 12, title: 'THE BOOK LIFE', isbn: '39485', author: 'AUTHOR' },
];

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // 検索機能
  const filteredBooks = BOOKS.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ページネーション計算
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // ページ変更ハンドラー
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-[#f0ebe5] p-8">
      {/* 検索バー */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 pr-12 bg-black text-white rounded-full focus:outline-none"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 書籍カードグリッド */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBooks.map(book => (
          <Link href={`/books/${book.id}`} key={book.id}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}