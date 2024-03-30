import React from 'react';

interface Props {
  label?: string;
}

export function LabledDivider({ label }: Props) {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="border flex-1" />
      <span className="text-neutral-500 font-light">{label}</span>
      <div className="border flex-1" />
    </div>
  );
}
