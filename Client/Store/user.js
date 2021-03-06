import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
export const getUser = user => ({ type: GET_USER, user });
export const updateUser = user => ({ type: UPDATE_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
// Specifically to check if a user is logged in
export const loggedIn = () => dispatch =>
  axios
    .get('/auth/isLoggedIn')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

// send request to either login or signup
export const auth = (userInfo, method) => dispatch =>
  axios
    .post(`/auth/${method}`, userInfo)
    .then(
      res => {
        dispatch(getUser(res.data));
        history.push('/home');
      },
      authError => {
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(err => console.error(err));

// update a user's balance on a transaction
export const updateBalance = balanceInfo => dispatch =>
  axios
    .put(`/api/user/${balanceInfo.userId}`, balanceInfo)
    .then(res => res.data)
    .then(user => {
      dispatch(updateUser(user));
    })
    .catch(err => console.error(err));

// log a user out
export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      history.push('/login');
    })
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return { ...state, balance: action.user.balance };
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
