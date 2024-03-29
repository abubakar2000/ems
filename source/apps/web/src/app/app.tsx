import * as stylex from '@stylexjs/stylex';
import AppRouter from './router/main/AppRouter';
import Dashboard from './layouts/Dashboard';

const styles = stylex.create({
  base: {
    userSelect: 'none',
  },
});

export function App() {
  return (
    <div {...stylex.props(styles.base)}>
      <Dashboard>
        <AppRouter />
      </Dashboard>
    </div>
  );
}

export default App;
