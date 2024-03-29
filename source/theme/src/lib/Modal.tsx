import React, { useState } from 'react';
import clsx from 'clsx';
import { MdClose } from 'react-icons/md';
import { Button } from './Button';

interface Props {
  children: React.ReactNode;
  triggerLabel?: string;
  modalTitle?: string;
}

export function Modal({ children, triggerLabel, modalTitle }: Props) {
  const [show, setShow] = useState(false);

  const onToggleModal = () => setShow(!show);
  return (
    <>
      <div className="flex justify-end items-center">
        {triggerLabel && (
          <Button
            attributes={{
              onClick: onToggleModal,
            }}
          >
            {triggerLabel}
          </Button>
        )}
      </div>
      <div
        className={clsx([
          'absolute top-0 left-0 right-0 bottom-0',
          'bg-white z-10 duration-300 transition-all ease-in',
          show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
        ])}
      >
        <div className="flex justify-between px-4 py-2 border-b items-center">
          <div>
            {modalTitle && (
              <h2 className="text-xl font-bold text-neutral-700">
                {modalTitle}
              </h2>
            )}
          </div>
          <MdClose
            size={30}
            onClick={onToggleModal}
            className="cursor-pointer"
          />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </>
  );
}
