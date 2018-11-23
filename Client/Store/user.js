import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
// Specifically to check if a user is logged in
export const LoggedIn = () => dispatch =>
  axios
    .get('/auth/isLoggedIn')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

// send request to either login or signup
export const auth = (userInfo, method) => dispatch =>
  axios
    .post(`/auth/${method}`, userInfo)
    .then(res => {
      dispatch(getUser(res.data));
      history.push('/home');
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
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}