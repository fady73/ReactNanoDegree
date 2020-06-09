import { RECEIVE_USERS } from './actionType'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
} 