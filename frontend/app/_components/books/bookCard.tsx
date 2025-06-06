// 書籍カードコンポーネント
interface Book {
  id: number;
  title: string;
  isbn: string;
  authors: string[];
  status: 'AVAILABLE' | 'BORROWED';
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center bg-[#f5efe3] rounded-lg">
        <h3 className="text-xl font-medium mb-1 text-gray-800 mt-5">{book.title}</h3>
        <p className="text-xs text-gray-600 mb-4 font-semibold">ISBN - {book.isbn}</p>
        <div className="text-xs text-gray-500 mb-4">
          <p>authors/</p>
          {book.authors.map((author, index) => (
            <p key={index} className="font-semibold">{author}</p>
          ))}
        </div>
        <p className={`text-xs font-semibold mb-5 ${
          book.status === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'
        }`}>
          {book.status === 'AVAILABLE' ? '貸出可能' : '貸出中'}
        </p>
      </div>
    </div>
  );
}