import Invoices from '../../pages/quotation/Invoices';
import QuoteCreator from '../../pages/quotation/QuoteCreator';
import Taxation from '../../pages/quotation/Taxation';

export default [
  {
    index: true,
    path: '/',
    Component: () => <QuoteCreator />,
    label: 'Create Quote',
    visible: false,
  },
  {
    index: true,
    path: '/',
    Component: () => <QuoteCreator />,
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
