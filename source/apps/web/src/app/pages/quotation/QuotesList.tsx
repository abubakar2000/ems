import { create, props } from '@stylexjs/stylex';
import { DataTable, Modal } from '@solutionave/theme';
import CreateQuote from './forms/CreateQuote';
import { useMemo, useState } from 'react';
import { useGetQuotationsQuery } from '../../data/quotation/quotation.api';
import { Button } from 'source/theme/src/lib/Button';
import { IQuotation } from '@ems/shared';

const QuotesList = () => {
  const [showCreationForm, setShowCreationForm] = useState(false);
  const toggleModal = () => setShowCreationForm(!showCreationForm);
  const { isLoading, data, refetch } = useGetQuotationsQuery({});

  const quotes = useMemo(() => {
    return data?.map((item: any) => {
      return {
        complaintNumber: item.complaintNumber,
        clientName: item.clientName,
        branchName: item.branchName,
        title: item.title,
        description: item.description,
        quotationLineItems: item.quotationLineItems,
        Edit: '_EDIT_',
        Delete: '_DELETE_',
        View: '_VIEW_',
      } as IQuotation;
    });
  }, [data]);

  return (
    <div {...props(styles.base)}>
      <div className="flex justify-end gap-2 items-center">
        <Modal
          triggerLabel="Add new"
          modalTitle="Create a Quote"
          show={showCreationForm}
          toggleModal={toggleModal}
        >
          <CreateQuote onCancel={toggleModal} />
        </Modal>
        <Button attributes={{ onClick: refetch }}>Reload</Button>
      </div>
      <DataTable data={quotes} />
    </div>
  );
};

export default QuotesList;

const styles = create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
