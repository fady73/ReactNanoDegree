import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAnswer } from '../../actions/questions'
import { Button, Form, Card, Row, Col, ListGroup, ListGroupItem, Container } from 'react-bootstrap';
import NotFound from '../NotFound/NotFound'
class AddAnswer extends Component {
  state = {
    answer: ''
  };
  async handleSubmit(e, questionId) {
    const { createAnswer, history,authedUser,id } = this.props
    const {answer}=this.state
    e.preventDefault()
    await createAnswer({
      authedUser:authedUser.userId,
      qid: questionId,
      answer: answer
    })
    await this.setState(() => ({
      answer: ''
    }))
    history.push(`/results/${id}`)

  }

  handleInputChange = (e) => {
    this.setState({ answer: e.target.value })
  }

  render() {
    const { users, question, id } = this.props
    const { answer } = this.state
    if (question===undefined){
      return <NotFound/>
    }
    return (<Container><Row className="justify-content-md-center">
      <Col md="auto">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" width="285" height="285" className="img-rounded text-center " src={users[question.author].avatarURL} />
          <Card.Body>
            <Card.Title className="text-center" ><b>{users[question.author].name}</b> asks would you rather:</Card.Title>
            <Form onSubmit={(e) => this.handleSubmit(e, id)}>
              <ListGroup className="pb-3">
                <ListGroupItem>
                  <input type="radio"
                    name="questionPoll"
                    id="optionOne"
                    className="mr-1"
                    value="optionOne"
                    onChange={this.handleInputChange}
                  />{question.optionOne.text}
                </ListGroupItem>
                <ListGroupItem>
                  <input type="radio"
                    name="questionPoll"
                    id="optionTwo"
                    className="mr-1"
                    value="optionTwo"
                    onChange={this.handleInputChange}
                  />{question.optionTwo.text}
                </ListGroupItem>
              </ListGroup>
              <Button
                className="pr-3"
                type='submit'
                disabled={answer === ''}
              >Submit </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row></Container>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  createAnswer: data => dispatch(createAnswer(data)),
});
const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const id = props.match.params.question_id
  return {
    question: questions[id],
    users,
    authedUser,
    id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAnswer)
