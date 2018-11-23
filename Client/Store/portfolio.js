import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = 'GET_PORTFOLIO';
const REMOVE_PORTFOLIO = 'REMOVE_PORTFOLIO';
const ADD_TO_PORTFOLIO = 'ADD_TO_PORTFOLIO';

/**
 * INITIAL STATE
 */
const defaultPortfolio = [];

/**
 * ACTION CREATORS
 */
export const getPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
});
export const addToPortfolio = item => ({
  type: ADD_TO_PORTFOLIO,
  item
});
export const removePortfolio = () => ({ type: REMOVE_PORTFOLIO });

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
      console.log('RESSS: ', res.data);
      dispatch(addTransaction(res.data || defaultTransactions));
    })
    .catch(err => console.log(err));

export const logoutTransactions = () => dispatch =>
  dispatch(removeTransactions());

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.PORTFOLIOs;
    case ADD_TO_PORTFOLIO:
      return [...state, action.item];
    case REMOVE_PORTFOLIO:
      return defaultPortfolio;
    default:
      return state;
  }
}
