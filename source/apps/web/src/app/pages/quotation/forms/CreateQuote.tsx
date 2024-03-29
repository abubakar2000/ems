import { IQuotation } from '@ems/shared';
import { create, props } from '@stylexjs/stylex';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { Button } from 'source/theme/src/lib/Button';
import { IoMdArrowForward } from 'react-icons/io';

interface Props {
  onCancel?: () => void;
}

const CreateQuote: FC<Props> = ({ onCancel }) => {
  const [newQuotation, setNewQuotation] = useState<IQuotation>({
    clientName: '',
    complaintNumber: '',
    branchName: '',
    title: '',
    description: '',
    quotationLineItems: [],
  });
  const [addLineItems, setAddLineItems] = useState(false);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newQuotation);
    alert('Submitted');
  };

  return (
    <div {...props(styles.base)}>
      <form onSubmit={onSubmitForm} {...props(styles.form)}>
        {!addLineItems && (
          <>
            <h1 {...props(styles.title)}>Create Quotation</h1>
            <input
              type="text"
              placeholder="Client Name"
              {...props(styles.input)}
            />
            <input
              type="text"
              placeholder="Compliant Number"
              {...props(styles.input)}
            />
            <input
              type="text"
              placeholder="Branch Name"
              {...props(styles.input)}
            />
            <input
              type="text"
              placeholder="Job Title"
              {...props(styles.input)}
            />
            <textarea
              placeholder="Job Description"
              {...props(styles.input)}
              rows={5}
            />
          </>
        )}
        {addLineItems && (
          <>
            <h1 {...props(styles.title)}>Add Line Items</h1>
            <input
              type="text"
              placeholder="Job Title"
              {...props(styles.input)}
            />
            <textarea
              placeholder="Job Description"
              {...props(styles.input)}
              rows={5}
            />
            <Button className="w-full bg-blue-600">Add Job</Button>
          </>
        )}
        <div className="border-[0.5pt]" />

        <div {...props(styles.buttonGroup)}>
          <div style={{ flex: 2 }} />
          <Button
            attributes={{ onClick: onCancel }}
            className={'bg-neutral-500 w-full'}
          >
            Cancel
          </Button>
          {!addLineItems ? (
            <Button
              buttonAttributes={{
                onClick: () => setAddLineItems(true),
              }}
              className="w-full bg-blue-600"
            >
              Add Tasks <IoMdArrowForward size={20} />
            </Button>
          ) : (
            <Button className="w-full bg-blue-600">Create</Button>
          )}
        </div>
      </form>
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
    backgroundColor: 'rgba(255,255,255,0.7)',
    boxShadow: '0px 0px 10px gainsboro',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minWidth: '400pt',
  },
  title: {
    fontSize: 25,
    color: 'black',
    opacity: 0.7,
  },
});
