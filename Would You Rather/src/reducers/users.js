import { RECEIVE_USERS,CREATE_NEW_ANSWER,CREATE_NEW_QUESTION} from '../actions/actionType'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
      case CREATE_NEW_ANSWER: 
        return {
            ...state,
            [action.authedUser] : {
                ...state[action.authedUser],
                answers : {
                    ...state[action.authedUser].answers,
                    [action.qid] : action.answer
                }
            }
        }
    
    case CREATE_NEW_QUESTION:
            const { id, author } = action.question;
            return {
              ...state,
              [author]: {
                ...state[author],
                questions: state[author].questions.concat(id)
              }
            }
          
    default :
      return state
  }
} 