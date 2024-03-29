import clsx from 'clsx';
import React, { DOMAttributes } from 'react';

interface Props {
  attributes: DOMAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}

export function Button({ attributes, children, className }: Props) {
  return (
    <button
      {...attributes}
      className={clsx([
        'px-3 py-1 bg-purple-400 text-white rounded-md hover:bg-purple-500 active:bg-purple-600 transition-all duration-300' ||
          className,
      ])}
    >
      {children}
    </button>
  );
}
