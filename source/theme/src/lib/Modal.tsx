import React, { useState } from 'react';
import clsx from 'clsx';
import { MdClose } from 'react-icons/md';
import { Button } from './Button';

interface Props {
  children: React.ReactNode;
  triggerLabel?: string;
  modalTitle?: string;
  toggleModal?: () => void;
  show?: boolean;
}

export function Modal({
  children,
  triggerLabel,
  modalTitle,
  toggleModal,
  show = true,
}: Props) {
  return (
    <>
      <div className="flex justify-end items-center">
        {triggerLabel && (
          <Button
            attributes={{
              onClick: toggleModal,
            }}
          >
            {triggerLabel}
          </Button>
        )}
      </div>
      <div
        className={clsx([
          'absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md',
          'bg-white bg-opacity-50 z-10 duration-300 transition-all ease-in',
          show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-200',
        ])}
      >
        <div className="flex justify-between px-4 py-2  items-center">
          <div>
            {modalTitle && (
              <h2 className="text-xl font-bold text-neutral-700">
                {modalTitle}
              </h2>
            )}
          </div>
          <MdClose size={30} onClick={toggleModal} className="cursor-pointer" />
        </div>
        <div className="px-4">{children}</div>
      </div>
    </>
  );
}
