import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

// create history to go back
const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory();

export default history;
