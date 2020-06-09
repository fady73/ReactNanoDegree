import { SET_AUTHED_USER } from '../actions/actionType'

export default function auth(state = {}, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return {
                ...state,
                userId: action.userId
            };

        default:
            return state
    }
}
