import clsx from 'clsx';
import '../styles.css';
import { NumberViewer } from './NumberViewer';
import { Button } from './Button';

interface Props<T> {
  data: T[];
  onClick?: (event: string, data: T) => void;
}

export function DataTable<T>({ data, onClick }: Props<T>) {
  if (typeof data !== 'object') {
    return;
  }
  return (
    <div>
      {true && data?.length > 0 && (
        <>
          <table className={clsx([])}>
            <thead>
              <tr>
                {Object.keys((data as any)?.[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(item).map((value: any, index) => {
                    if (
                      typeof value === 'string' &&
                      value?.at(0) === '_' &&
                      value?.at(value.length - 1) === '_'
                    ) {
                      return (
                        <td
                          key={index}
                          className="flex items-center justify-center"
                        >
                          <Button
                            attributes={{
                              onClick: () => {
                                if (onClick) onClick(value, item);
                              },
                            }}
                          >
                            {value?.replace(/_/g, '')}
                          </Button>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={index}
                        onClick={() => {
                          if (onClick) onClick(value, item);
                        }}
                      >
                        {typeof value === 'number' && item !== 'Id' ? (
                          <div className="text-end">
                            <NumberViewer>{value}</NumberViewer>
                          </div>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
