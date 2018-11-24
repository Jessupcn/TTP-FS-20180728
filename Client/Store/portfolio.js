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

export const addToPortfolio = itemToAdd => ({
  type: ADD_TO_PORTFOLIO,
  itemToAdd
});

export const removePortfolio = () => ({ type: REMOVE_PORTFOLIO });

/**
 * THUNK CREATORS
 */

// fetches all assets in a user's portfolio
export const fetchAssets = userId => dispatch => {
  return axios
    .get(`/api/portfolio/${userId}`)
    .then(res => {
      dispatch(getPortfolio(res.data || defaultPortfolio));
    })
    .catch(err => console.log(err));
};

// updates Portfolio with a new transaction
export const postAsset = asset => dispatch => {
  axios
    .post('/api/portfolio', asset)
    .then(res => {
      dispatch(addToPortfolio(res.data || defaultPortfolio));
    })
    .catch(err => console.log(err));
};

export const logoutPortfolio = () => dispatch => dispatch(removePortfolio());

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio;
    case ADD_TO_PORTFOLIO:
      return state;
    case REMOVE_PORTFOLIO:
      return defaultPortfolio;
    default:
      return state;
  }
}
