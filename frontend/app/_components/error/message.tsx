interface ErrorMessageProps {
  errorMessage: string;
  isOpen: boolean;
  className?: string;
}

export function ErrorMessage({
  errorMessage,
  isOpen,
  className = '',
}: ErrorMessageProps) {
  return (
    <>
      {isOpen && (
        <div className={`text-red-600 text-sm font-medium mt-1 ${className}`}>
          {errorMessage}
        </div>
      )}
    </>
  );
}