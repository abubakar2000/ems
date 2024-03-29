import clsx from 'clsx';
import '../styles.css';

interface Props<T> {
  data: T[];
}

export function DataTable<T>({ data }: Props<T>) {
  if (typeof data !== 'object') {
    return;
  }
  return (
    <div>
      {true && data?.length > 0 && (
        <>
          <table className={clsx([])}>
            <thead>
              {Object.keys((data as any)?.[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id}>
                  {Object.values(item).map((value: any) => (
                    <td key={value}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={clsx(['p-3 flex justify-end'])}>Pagination here</div>
        </>
      )}
    </div>
  );
}
