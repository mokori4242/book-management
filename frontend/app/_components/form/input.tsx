// frontend/app/_components/form/input.tsx
import { ChangeEvent } from 'react';

interface InputProps {
  id: string;
  name: string;
  type: 'text' | 'password' | 'email' | 'number';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function Input({
  id,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder = '',
  className = '',
}: InputProps) {
  return (
    <div className="relative border-t border-gray-300">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full border-0 bg-white p-2 focus:outline-none ${className}`}
      />
    </div>
  );
}