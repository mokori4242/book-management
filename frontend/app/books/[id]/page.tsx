'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

// 書籍データ（サンプル、実際にはAPIから取得）
const BOOKS = [
  { id: 1, title: 'THE BOOK LIFE', isbn: '80887', author: 'AUTHOR', description: '書籍の詳細説明がここに入ります。' },
  { id: 2, title: 'THE BONN LIFE', isbn: '40647', author: 'AUTHOR', description: '書籍の詳細説明がここに入ります。' },
  { id: 3, title: 'THE BOOK\'S INDS', isbn: '43787', author: 'AUTHOR', description: '書籍の詳細説明がここに入ります。' },
  { id: 4, title: 'THE BOOK LIFE', isbn: '40831', author: 'AUTHOR', description: '書籍の詳細説明がここに入ります。' },
  { id: 5, title: 'THE BOOK LIFE', isbn: '30977', author: 'AUTHOR', description: '書籍の詳細説明がここに入ります。' },
  { id: 6, title: 'THE BOOK LIFE', isbn: '80210', author: 'AUTHOR', description: '書籍の詳細説明がここに入ります。' },
];

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  // idに一致する書籍を検索
  const book = BOOKS.find(book => book.id === id);

  // 書籍が見つからない場合
  if (!book) {
    return (
      <div className="min-h-screen bg-[#f0ebe5] p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">書籍が見つかりませんでした</h2>
        <button
          onClick={() => router.push('/books')}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          書籍一覧に戻る
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ebe5] p-8">
      <div className="max-w-4xl mx-auto">
        {/* 戻るボタン */}
        <button
          onClick={() => router.push('/books')}
          className="mb-8 flex items-center text-gray-700 hover:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          書籍一覧に戻る
        </button>

        {/* 書籍詳細 */}
        <div className="bg-[#f5efe3] rounded-lg p-8 shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="bg-[#e8e2d7] p-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/file.svg"
                  alt={book.title}
                  width={100}
                  height={100}
                  className="text-gray-600"
                />
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">ISBN-{book.isbn}</p>
              <p className="text-md text-gray-500 mb-6">/id. {book.author}</p>

              <div className="border-t border-gray-300 pt-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">概要</h2>
                <p className="text-gray-700">{book.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}