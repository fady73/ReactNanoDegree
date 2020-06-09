import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
class SingleQuestion extends Component {

  render() {
    const { user, question, questionState,id} = this.props;
    const answerOrResultLink = questionState === 'answered' ? `/results/${id}` : `/answer/${id}`
    return (<Row className="justify-content-md-center p-3">
          <Col xs="2">
            <Image src={user.avatarURL} className="col-12" roundedCircle fluid />
          </Col>
          <Col xs="10">
            <Row>
              <Col xs="12">
              <Link to={answerOrResultLink}>
                <p><b>{user.name}</b> asks would you rather:</p></Link></Col>
              <Col xs="12">
                <ListGroup>
                  <ListGroupItem>{question.optionOne.text}</ListGroupItem>
                  <ListGroupItem>{question.optionTwo.text}</ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Col>
        </Row>

      )
  }
}

const mapStateToProps = ({ questions, users, authedUser }, { id }) => {
  return {
    question: questions[id],
    id,
    user: users[questions[id].author],
    authedUser
  }
}

export default connect(mapStateToProps)(SingleQuestion)
