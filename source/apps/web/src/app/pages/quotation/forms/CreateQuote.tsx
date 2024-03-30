import {
  IQuotation,
  IQuotationLineItem,
  calculatedQuotationHeader,
  calculatedQuotationLevelHeaders,
} from '@ems/shared';
import { create, props } from '@stylexjs/stylex';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button } from 'source/theme/src/lib/Button';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io';
import {
  DataTable,
  LabledDivider,
  Loader,
  NumberViewer,
} from '@solutionave/theme';
import { useCreateQuotationMutation } from '../../../data/quotation/quotation.api';

interface Props {
  onCancel?: () => void;
}

const CreateQuote: FC<Props> = ({ onCancel }) => {
  const [createQuotation, { isLoading, data, isError, isSuccess }] =
    useCreateQuotationMutation();
  const [newQuotation, setNewQuotation] = useState<IQuotation>({
    clientName: '',
    complaintNumber: '',
    branchName: '',
    title: '',
    description: '',
    incomeTaxRate: null,
    salesTaxRecovery: null,
    quotationLineItems: [],
  });
  const [addLineItems, setAddLineItems] = useState(false);
  const [newLineItem, setNewLineItem] = useState<IQuotationLineItem>({
    title: '',
    description: '',
    unit: '',
    purchasePricePerUnit: null,
    quantity: null,
    salePricePerUnit: null,
    saleTaxRate: null,
  });

  const clearNewItem = useCallback(() => {
    setNewLineItem({
      title: '',
      description: '',
      unit: '',
      saleTaxRate: null,
      purchasePricePerUnit: null,
      quantity: null,
      salePricePerUnit: null,
    });
  }, [newLineItem]);

  const addNewItem = () => {
    setNewQuotation({
      ...newQuotation,
      quotationLineItems: [...newQuotation.quotationLineItems, newLineItem],
    });
    clearNewItem();
  };

  const onClickTableCell = (event: string, data: any) => {
    if (event === '_DELETE_') {
      setNewQuotation({
        ...newQuotation,
        quotationLineItems: newQuotation.quotationLineItems?.filter(
          (_, index) => index + 1 !== Number(data.Id)
        ),
      });
    }
  };

  const quotationHeaders = useMemo(() => {
    return {
      ...calculatedQuotationHeader(newLineItem),
    };
  }, [newLineItem]);

  const lineItems = useMemo(() => {
    return newQuotation.quotationLineItems?.map((lineItem, index) => {
      const item = calculatedQuotationHeader(lineItem);
      return {
        Id: String(index + 1),
        Title: lineItem.title,
        Unit: lineItem.unit,
        Qty: lineItem.quantity,
        'PR/Unit': lineItem.purchasePricePerUnit,
        'PR Total': item.purchasePriceTotal,
        'SP/Unit': lineItem.salePricePerUnit,
        'SP Total': item.salePriceTotal,
        'ST%': lineItem.saleTaxRate,
        'ST/Unit': item.saleTaxPerUnit,
        'T.ST': item.saleTaxTotal,
        'Quoted Price/Unit': item.quotedPricePerUnit,
        'Sub Total': item.subTotal,
        Delete: '_DELETE_',
      };
    });
  }, [newQuotation]);

  const onSubmitForm = () => {
    createQuotation(newQuotation);
  };

  return (
    <div {...props(styles.base)}>
      <Loader visible={isLoading} />
      {isError && <div className="text-sm text-red-50">An Error Occurred</div>}
      {isSuccess && <div className="text-sm text-green-500">Saved!</div>}
      <form onSubmit={onSubmitForm} {...props(styles.form)}>
        {!addLineItems && (
          <>
            <h1 {...props(styles.title)}>Create Quotation</h1>
            <div {...props(styles.row)}>
              <input
                type="text"
                placeholder="Client Name"
                value={newQuotation.clientName}
                onChange={(e) =>
                  setNewQuotation({
                    ...newQuotation,
                    clientName: e.target.value,
                  })
                }
                {...props(styles.input)}
              />
              <input
                type="text"
                placeholder="Job Title"
                value={newQuotation.title}
                onChange={(e) =>
                  setNewQuotation({ ...newQuotation, title: e.target.value })
                }
                {...props(styles.input)}
              />
            </div>
            <div {...props(styles.row)}>
              <input
                type="text"
                placeholder="Compliant Number"
                value={newQuotation.complaintNumber}
                onChange={(e) =>
                  setNewQuotation({
                    ...newQuotation,
                    complaintNumber: e.target.value,
                  })
                }
                {...props(styles.input)}
              />
              <input
                type="text"
                placeholder="Branch Name"
                value={newQuotation.branchName}
                onChange={(e) =>
                  setNewQuotation({
                    ...newQuotation,
                    branchName: e.target.value,
                  })
                }
                {...props(styles.input)}
              />
            </div>
            <div {...props(styles.row)}>
              <input
                type="number"
                placeholder="Income Tax rate (%)"
                value={newQuotation.incomeTaxRate || ''}
                onChange={(e) =>
                  setNewQuotation({
                    ...newQuotation,
                    incomeTaxRate: Number(e.target.value),
                  })
                }
                {...props(styles.input)}
              />
              <input
                type="number"
                placeholder="GST Recovery"
                value={newQuotation.salesTaxRecovery || ''}
                onChange={(e) =>
                  setNewQuotation({
                    ...newQuotation,
                    salesTaxRecovery: Number(e.target.value),
                  })
                }
                {...props(styles.input)}
              />
            </div>
            <textarea
              placeholder="Job Description"
              value={newQuotation.description}
              onChange={(e) =>
                setNewQuotation({
                  ...newQuotation,
                  description: e.target.value,
                })
              }
              {...props(styles.input)}
              rows={5}
            />
          </>
        )}
        {addLineItems && (
          <>
            <h1 {...props(styles.title)}>
              Add Line Items{' '}
              <sup>{newQuotation?.quotationLineItems?.length}</sup>
            </h1>

            <input
              type="text"
              placeholder="Job Title"
              value={newLineItem.title}
              onChange={(e) =>
                setNewLineItem({ ...newLineItem, title: e.target.value })
              }
              {...props(styles.input)}
            />
            <textarea
              placeholder="Job Description"
              value={newLineItem.description}
              onChange={(e) =>
                setNewLineItem({
                  ...newLineItem,
                  description: e.target.value,
                })
              }
              {...props(styles.input)}
              rows={5}
            />
            <div {...props(styles.row)}>
              <input
                type="number"
                placeholder="Quantity"
                value={newLineItem.quantity || ''}
                onChange={(e) =>
                  setNewLineItem({
                    ...newLineItem,
                    quantity: Number(e.target.value),
                  })
                }
                {...props(styles.input)}
              />
              <input
                type="text"
                placeholder="Unit"
                value={newLineItem.unit}
                onChange={(e) =>
                  setNewLineItem({
                    ...newLineItem,
                    unit: e.target.value,
                  })
                }
                {...props(styles.input)}
              />
            </div>
            <LabledDivider label="Purchase Information" />
            <div {...props(styles.row)}>
              <input
                type="number"
                placeholder="Purchase Rate / Unit"
                value={newLineItem.purchasePricePerUnit || ''}
                onChange={(e) =>
                  setNewLineItem({
                    ...newLineItem,
                    purchasePricePerUnit: Number(e.target.value),
                  })
                }
                {...props(styles.input)}
              />
              <div className="flex-1 text-center text-neutral-600">
                <NumberViewer>
                  {Number(newLineItem.purchasePricePerUnit) *
                    Number(newLineItem.quantity)}
                </NumberViewer>
                (PR Total)
              </div>
            </div>
            <LabledDivider label="Sales Information" />
            <div {...props(styles.row)}>
              <input
                type="number"
                placeholder="Sale Rate / Unit"
                value={newLineItem.salePricePerUnit || ''}
                onChange={(e) =>
                  setNewLineItem({
                    ...newLineItem,
                    salePricePerUnit: Number(e.target.value),
                  })
                }
                {...props(styles.input)}
              />
              <div className="flex-1 text-center text-neutral-600">
                <NumberViewer>
                  {Number(newLineItem.salePricePerUnit) *
                    Number(newLineItem.quantity)}
                </NumberViewer>
                (SR Total)
              </div>
            </div>
            <LabledDivider label="Taxation" />
            <div {...props(styles.row)}>
              <input
                type="number"
                placeholder="Sale Tax (%)"
                value={newLineItem.saleTaxRate || ''}
                onChange={(e) =>
                  setNewLineItem({
                    ...newLineItem,
                    saleTaxRate: Number(e.target.value),
                  })
                }
                {...props(styles.input)}
              />
              <div className="flex-1 text-center text-neutral-600">
                <span>
                  <NumberViewer>{quotationHeaders.saleTaxTotal}</NumberViewer>{' '}
                  (T.ST)
                </span>
                <sup>
                  <NumberViewer>{quotationHeaders.saleTaxPerUnit}</NumberViewer>{' '}
                  (ST/Unit)
                </sup>
              </div>
            </div>
            <LabledDivider label="Quotation" />
            <div {...props(styles.row)}>
              <div {...props(styles.infoBox)}>
                <b>Rate/Unit</b>
              </div>
              <div {...props(styles.infoBox)}>
                <NumberViewer>
                  {quotationHeaders.quotedPricePerUnit}
                </NumberViewer>
              </div>
            </div>
            <div {...props(styles.row)}>
              <div {...props(styles.infoBox)}>
                <b>Sub Total</b>
              </div>
              <div {...props(styles.infoBox)}>
                <NumberViewer>{quotationHeaders.subTotal}</NumberViewer>
              </div>
            </div>
            <Button
              className="w-full bg-blue-600"
              attributes={{ onClick: addNewItem }}
              disabled={!newLineItem?.title || !quotationHeaders?.subTotal}
            >
              Add Job
            </Button>
          </>
        )}
        <div className="border-[0.5pt]" />
        <div {...props(styles.buttonGroup)}>
          <div style={{ flex: 2 }} />
          <Button
            attributes={{
              onClick: addLineItems ? () => setAddLineItems(false) : onCancel,
            }}
            className={'bg-neutral-500 w-full flex-1'}
          >
            {addLineItems ? (
              <>
                <IoMdArrowBack size={20} />
                Back
              </>
            ) : (
              'Close'
            )}
          </Button>
          {!addLineItems ? (
            <Button
              attributes={{
                onClick: () => setAddLineItems(true),
              }}
              className="w-full bg-blue-600 flex-1"
            >
              Add Tasks <IoMdArrowForward size={20} />
            </Button>
          ) : (
            <Button
              className="w-full bg-blue-600 flex-1"
              attributes={{ onClick: onSubmitForm }}
            >
              Create
            </Button>
          )}
        </div>
      </form>
      <div className="w-full max-w-[1200pt]">
        <div {...props(styles.tableView)}>
          <DataTable data={lineItems} onClick={onClickTableCell} />
          <br />
          <DataTable data={[calculatedQuotationLevelHeaders(newQuotation)]} />
        </div>
      </div>
    </div>
  );
};

export default CreateQuote;

const styles = create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    minHeight: '80vh',
    borderRadius: 20,
    padding: '20pt',
    backgroundColor: 'rgba(255,255,255,0.7)',
    boxShadow: '0px 0px 10px gainsboro',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: '5pt',
    fontSize: 15,
    paddingStart: '7pt',
    paddingEnd: '7pt',
    paddingTop: '2pt',
    paddingBottom: '2pt',
    flex: 1,
  },
  infoBox: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    opacity: 0.7,
    border: '1px solid #ccc',
    padding: 5,
    borderRadius: '5pt',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minWidth: '500pt',
  },
  title: {
    fontSize: 25,
    color: 'black',
    opacity: 0.7,
  },
  tableView: {
    overflow: 'auto',
    padding: 10,
    borderRadius: 10,
  },
});
