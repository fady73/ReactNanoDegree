import { RECEIVE_QUESTIONS,CREATE_NEW_QUESTION,CREATE_NEW_ANSWER } from './actionType'
import {_saveQuestionAnswer, _saveQuestion  } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}
export function createNewQuestion(question) {
  return {
      type: CREATE_NEW_QUESTION,
      question
  }
}

export function createNewAnswer(answerObj) {
  return {
      type: CREATE_NEW_ANSWER,
      ...answerObj
  }
}
export function createQuestion(data) {
  const {authedUser,optionOne,optionTwo}=data
  return (dispatch) => {
      dispatch(showLoading());
      return _saveQuestion({
          optionOneText:optionOne,
          optionTwoText:optionTwo,
          author: authedUser.userId
      })
      .then((question) =>{
         dispatch(createNewQuestion(question))
        })
      .then(() => dispatch(hideLoading()))
  }
}

export function createAnswer(answerData) {
  return (dispatch) => {
      dispatch(showLoading());
      return _saveQuestionAnswer(answerData)
      .then(() => dispatch(createNewAnswer(answerData)))
      .then(() => dispatch(hideLoading()))
  }
}