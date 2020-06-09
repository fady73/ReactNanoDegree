
import { RECEIVE_QUESTIONS,CREATE_NEW_QUESTION,CREATE_NEW_ANSWER} from '../actions/actionType'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case CREATE_NEW_QUESTION:
      const { question } = action
      return {
        ...state,
        [action.question.id]: question
      }
    case CREATE_NEW_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    default:
      return state
  }
} 