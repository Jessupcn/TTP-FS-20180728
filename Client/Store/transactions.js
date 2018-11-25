import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const REMOVE_TRANSACTIONS = 'REMOVE_TRANSACTIONS';
const ADD_TRANSACTION = 'ADD_TRANSACTION';

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
export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction
});
export const removeTransactions = () => ({ type: REMOVE_TRANSACTIONS });

/**
 * THUNK CREATORS
 */
export const fetchTransactions = userId => dispatch => {
  return axios
    .get(`/api/transactions/${userId}`)
    .then(res => {
      dispatch(getTransactions(res.data || defaultTransactions));
    })
    .catch(err => console.log(err));
};

export const postTransaction = transaction => dispatch =>
  axios
    .post('/api/transactions', transaction)
    .then(res => {
      dispatch(
        addTransaction({ transactions: res.data } || defaultTransactions)
      );
    })
    .catch(err => console.log(err));

export const logoutTransactions = () => dispatch =>
  dispatch(removeTransactions());

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    case ADD_TRANSACTION:
      return [...state, action.transaction];
    case REMOVE_TRANSACTIONS:
      return defaultTransactions;
    default:
      return state;
  }
}
