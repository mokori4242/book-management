import { ReactNode } from 'react';

interface TypographyH1Props {
  children: ReactNode;
  className?: string;
}

export function TypographyH1({children, className = "" }: TypographyH1Props) {
  return (
    <h1 className={`${className}`}>
      {children}
    </h1>
  )
}
