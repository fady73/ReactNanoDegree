import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SingleQuestion from './SingleQuestion';
import { TabContent, TabPane, Nav, Row, Container } from 'react-bootstrap'
class Dashboard extends Component {
  state = {
    tabsActive: true
  };

  render() {
    const { tabsActive } = this.state;
    const { answerQuestion, unanswerQuestion } = this.props
    return (
      <Container fluid="md">
        <Row className="p-3">
          <Nav variant="tabs" >
            <Nav.Item>
              <Nav.Link onClick={(e) => this.setState(() => ({
                tabsActive: true
              }))}>
                Unanswered Questions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={(e) => this.setState(() => ({
                tabsActive: false
              }))}>
                Answered Questions</Nav.Link>
            </Nav.Item>

          </Nav>
        </Row>
        <TabContent >
          <TabPane active={tabsActive} >
              {unanswerQuestion.map((id) =>
                <Fragment key={id}>
                  <SingleQuestion id={id} questionState='unanswered' /></Fragment>
              )}
          </TabPane>
          <TabPane active={tabsActive === false}>
              {answerQuestion.map((id) =>
                <Fragment key={id}>
                  <SingleQuestion id={id} questionState='answered' /></Fragment>
              )}
          </TabPane>
        </TabContent>
      </Container>
    )
  }
}

const mapStateToProps=({ authedUser, users, questions }) =>{
  const answerQuestion = Object.keys(users[authedUser.userId].answers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  const unanswerQuestion = Object.keys(questions).filter(id => !answerQuestion.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  return {
    answerQuestion, unanswerQuestion
  }
}
export default connect(mapStateToProps)(Dashboard);
