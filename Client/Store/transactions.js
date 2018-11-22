import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const REMOVE_TRANSACTIONS = 'REMOVE_TRANSACTIONS';

/**
 * INITIAL STATE
 */
const defaultTransactions = [];

/**
 * ACTION CREATORS
 */
export const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
});
export const removeTransactions = () => ({ type: REMOVE_TRANSACTIONS });

/**
 * THUNK CREATORS
 */
export const fetchTransactions = userId => dispatch =>
  axios
    .get(`/api/transactions/${userId}`)
    .then(res => {
      console.log('GOT SOME DATA: ', res.data);
      dispatch(getTransactions(res.data || defaultTransactions));
    })
    .catch(err => console.log(err));

export const postTransaction = () => dispatch => axios.post();

export const logoutTransactions = () => dispatch =>
  dispatch(removeTransactions());

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    case REMOVE_TRANSACTIONS:
      return defaultTransactions;
    default:
      return state;
  }
}
