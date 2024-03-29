import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: {
    fontSize: 30,
    color: 'yellow',
    backgroundColor: 'black',
  },
  highlighted: {
    ':hover': {
      backgroundColor: 'blue',
    },
    backgroundColor: 'red',
  },
});

export function App() {
  return (
    <div {...stylex.props(styles.base, styles.highlighted)}>
      {JSON.stringify(stylex.props(styles.base).className)}
    </div>
  );
}

export default App;
