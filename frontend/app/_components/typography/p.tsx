import { ReactNode } from 'react';

interface TypographyPProps {
  children: ReactNode;
  className?: string;
}

export function TypographyP({children, className = ""}: TypographyPProps) {
    return (
    <p className={`${className}`}>
      {children}
    </p>
  )
}
