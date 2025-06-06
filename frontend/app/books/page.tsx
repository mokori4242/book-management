'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import BookCard from '../_components/books/bookCard';

interface Book {
  id: number;
  title: string;
  isbn: string;
  authors: string[];
  status: 'AVAILABLE' | 'BORROWED';
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface ApiResponse {
  data: Book[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [inputValue, setInputValue] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('title') || '';

  // 検索ハンドラー（遅延処理）
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('title', term);
    } else {
      params.delete('title');
    }
    params.set('page', '1'); // 検索時は1ページ目に戻す
    replace(`${pathname}?${params.toString()}`);
  }, 500); // 500ミリ秒の遅延

  // 入力値の更新ハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  // 書籍データの取得
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set('title', searchQuery);
        params.set('page', currentPage.toString());

        const response = await fetch(`http://localhost:8000/api/books?${params.toString()}`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: ApiResponse = await response.json();
          setBooks(data.data);
          setPaginationMeta(data.meta);
        } else {
          console.error('書籍データの取得に失敗しました');
        }
      } catch (error) {
        console.error('サーバーとの通信に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchQuery]);

  // ページ変更ハンドラー
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0ebe5] p-8 flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ebe5] p-8">
      {/* 検索バー */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH"
            value={inputValue}
            onChange={handleInputChange}
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
      <div className="mx-auto grid sm:grid-cols-1 lg:grid-cols-5 gap-4">
        {books.map(book => (
          <Link href={`/books/${book.id}`} key={book.id}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>

      {/* ページネーション */}
      {paginationMeta && paginationMeta.last_page > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            {Array.from({ length: paginationMeta.last_page }, (_, i) => i + 1).map((page) => (
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