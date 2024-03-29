import * as stylex from '@stylexjs/stylex';
import AppRouter from './router/main/AppRouter';
import Dashboard from './layouts/Dashboard';
import { Provider } from 'react-redux';
import { store } from './data/store';

const styles = stylex.create({
  base: {
    userSelect: 'none',
  },
});

export function App() {
  return (
    <Provider store={store}>
      <div {...stylex.props(styles.base)}>
        <Dashboard>
          <AppRouter />
        </Dashboard>
      </div>
    </Provider>
  );
}

export default App;
