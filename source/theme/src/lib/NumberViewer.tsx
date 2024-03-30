import React from 'react';

interface Props {
  children?: number | string;
}

export function NumberViewer({ children }: Props) {
  if (isNaN(Number(children))) {
    return <span>0 </span>;
  }
  return <span>{Number(children)?.toFixed(2)} </span>;
}
