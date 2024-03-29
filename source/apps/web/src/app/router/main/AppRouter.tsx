import QuoteCreator from '../../pages/quotation/QuoteCreator';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {AppRoutes.map(({ Component, path }) => {
          return <Route path={path} Component={Component} />;
        })}
      </Routes>
    </div>
  );
};

export default AppRouter;
