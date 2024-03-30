import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DOMAttributes } from 'react';

interface Props {
  children?: React.ReactNode;
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  className,
  attributes,
  disabled = false,
}: Props) {
  return (
    <button
      {...attributes}
      type="button"
      className={clsx([
        'uppercase hover:opacity-75 active:opacity-100 text-sm flex-1',
        'px-3 py-1 text-white rounded-md transition-all duration-300',
        'flex flex-row items-center justify-center gap-2',
        'hover:gap-4',
        className || 'bg-blue-600',
        disabled && 'opacity-75',
      ])}
      onClick={disabled ? undefined : attributes?.onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
