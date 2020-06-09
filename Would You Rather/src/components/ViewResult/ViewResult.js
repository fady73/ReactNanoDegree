import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Row, Col, ListGroup, ListGroupItem, Container  } from 'react-bootstrap';

class ViewResult extends Component {
  render() {
    const {question,authedUser,users,questions} = this.props
    if (question===undefined){
    }
    const optionOneVotesNumber = question.optionOne.votes.length
    const optionTwoVotesNumber = question.optionTwo.votes.length
    const totalVotes = optionOneVotesNumber + optionTwoVotesNumber
    const optionOnePercentage = parseInt((optionOneVotesNumber / totalVotes) * 100, 10)
    const optionTwoPercentage = parseInt((optionTwoVotesNumber / totalVotes) * 100, 10)
      return (
        <Container>
        <Row className="justify-content-md-center">
          <Col  md="auto">
                      <Col xs="12" className="text-center" >
                        <b>Asked by {users[questions[question.id].author].name}</b><br/>

                        <b>{users[authedUser.userId].name}</b> chose{questions[question.id][users[authedUser.userId].answers[question.id]].text}</Col>
                        <ListGroup>
                            <ListGroupItem> 
                              Option 1: {question.optionOne.text} ({optionOneVotesNumber} votes out of {totalVotes}) (Option 1: {optionOnePercentage}% )
                            </ListGroupItem>
                            <ListGroupItem>
                               Option 2: {question.optionTwo.text} ({optionTwoVotesNumber} votes out of{totalVotes}) (Option 2: {optionTwoPercentage}%)
                            </ListGroupItem>
                        </ListGroup>
          </Col>
        </Row>
        </Container>
      )
    }
}

const mapStateToProps=({ questions, users, authedUser }, props) =>{
  return {
    question:questions[props.match.params.question_id],
    users,
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(ViewResult)

