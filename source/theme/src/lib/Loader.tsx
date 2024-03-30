import clsx from 'clsx';
import { FaSpinner } from 'react-icons/fa';

interface Props {
  visible?: boolean;
}

export function Loader({ visible = false }: Props) {
  if (!visible) return <></>;
  return (
    <div
      className={clsx([
        'fixed top-0 left-0 right-0 bottom-0 z-10 bg-black',
        'flex justify-center items-center gap-2 bg-opacity-50',
        'backdrop-blur-sm',
      ])}
    >
      <div className="loader animate-spin">
        <FaSpinner className="spinner" color="white" size={25} />
      </div>
      <div className="text-white">Loading...</div>
    </div>
  );
}
