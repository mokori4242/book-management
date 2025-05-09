import { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
}

export function FormField({ id, label, children }: FormFieldProps) {
  return (
    <div className="overflow-hidden rounded-md bg-white shadow">
      <div className="px-3 py-1">
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xl font-medium text-gray-700 text-left">
            {label}
          </label>
        </div>
        {children}
      </div>
    </div>
  );
}