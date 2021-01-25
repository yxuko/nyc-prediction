import {createMemoryHistory, createBrowserHistory} from 'history'

const History =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory()
    : createBrowserHistory()

export default History
