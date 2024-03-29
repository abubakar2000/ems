import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DOMAttributes } from 'react';

interface Props {
  children?: React.ReactNode;
  attributes?: DOMAttributes<HTMLButtonElement>;
  buttonAttributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
}

export function Button({ children, className, buttonAttributes }: Props) {
  return (
    <button
      {...buttonAttributes}
      type="button"
      className={clsx([
        'uppercase hover:opacity-75 active:opacity-100 text-sm flex-1',
        'px-3 py-1 text-white rounded-md transition-all duration-300',
        'flex flex-row items-center justify-center gap-2',
        'hover:gap-4',
        className || 'bg-purple-600',
      ])}
    >
      {children}
    </button>
  );
}
