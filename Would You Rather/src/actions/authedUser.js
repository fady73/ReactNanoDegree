import { SET_AUTHED_USER } from './actionType'
import { showLoading, hideLoading } from 'react-redux-loading';

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    userId:id,
  }
}
export function handleLoginUser(id) {
  return (dispatch) => {
      dispatch(showLoading())
      dispatch(setAuthedUser(id))
      dispatch(hideLoading())
  }
}
export function handleLogoutUser() {
  return (dispatch) => {
      dispatch(showLoading())
      dispatch(setAuthedUser(undefined))
      dispatch(hideLoading())
  }
}