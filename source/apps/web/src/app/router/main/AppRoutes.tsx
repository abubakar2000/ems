import Invoices from '../../pages/quotation/Invoices';
import QuotesList from '../../pages/quotation/QuotesList';
import Taxation from '../../pages/quotation/Taxation';
import CreateQuote from '../../pages/quotation/forms/CreateQuote';

export default [
  {
    index: true,
    path: '/',
    Component: () => <QuotesList />,
    label: 'Create Quote',
    visible: false,
  },
  {
    index: true,
    path: '/',
    Component: () => <QuotesList />,
    label: 'Quotes',
    visible: true,
  },
  {
    index: true,
    path: '/create-quote',
    Component: () => <CreateQuote />,
    label: 'Create Quote',
    visible: true,
  },
  {
    path: '/taxation',
    Component: () => <Taxation />,
    label: 'Manage Taxes',
    visible: true,
  },
  {
    path: '/invoices',
    Component: () => <Invoices />,
    label: 'Invoices',
    visible: true,
  },
];
