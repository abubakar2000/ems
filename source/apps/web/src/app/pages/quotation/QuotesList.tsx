import { create, props } from '@stylexjs/stylex';
import { DataTable, Modal } from '@solutionave/theme';

const QuotesList = () => {
  const quotes = [
    {
      id: 1,
      customer: 'John Doe',
      amount: 1000,
      date: '2021-01-01',
    },
    {
      id: 2,
      customer: 'Jane Doe',
      amount: 2000,
      date: '2021-01-02',
    },
  ];

  return (
    <div {...props(styles.base)}>
      <Modal triggerLabel="Add new" modalTitle="Create a Quote">
        <div>Modal content</div>
      </Modal>
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
