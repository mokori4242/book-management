// 書籍カードコンポーネント
interface Book {
  id: number;
  title: string;
  isbn: string;
  author: string;
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center bg-[#f5efe3] rounded-lg">
        <h3 className="text-xl font-medium mb-1 text-gray-800 mt-5">{book.title}</h3>
        <p className="text-xs text-gray-600 mb-8 font-semibold">ISBN - {book.isbn}</p>
        <p className="text-xs text-gray-500 mb-5">author/ <span className="font-semibold">{book.author}</span></p>
      </div>
    </div>
  );
}