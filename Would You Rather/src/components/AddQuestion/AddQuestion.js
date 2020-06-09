import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion } from '../../actions/questions'
import {Button,Form,FormGroup,Row,Col,Container  } from 'react-bootstrap';

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    authedUser:undefined
  }

  componentWillMount(){
    this.setState({authedUser:this.props.authedUser})
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  createNewQuestion =async (e) => {
    e.preventDefault()
    const {addNewQuestion,history} =this.props
   await addNewQuestion(this.state )
    history.push('/dashboard')
  }

  render() {
    const { optionOne, optionTwo } = this.state

    return<Container><Row className="justify-content-md-center">
            <Col xs="12" md="auto">
            <Col xs="12" className="p-3" >
                <b>Would You Rather:</b></Col>
                  <Form onSubmit={this.createNewQuestion}>
                    <FormGroup>
                    <Form.Control type="text"
                    size='lg'
                        name="optionOne"
                        value={optionOne}
                        onChange={this.handleChange}
                        placeholder="Option One" />
                    </FormGroup>
                    <FormGroup>
                    <Form.Control type="text"
                       size='lg'
                        name="optionTwo"
                        value={optionTwo}
                        onChange={this.handleChange}
                        placeholder="Option Two" />
                    </FormGroup>
                    <Button  variant="primary"  type="submit" value='Submit' disabled={optionOne.length<=0 ||optionTwo.length<=0 }>Submit</Button>
                  </Form>
            </Col>
          </Row></Container> 
  }
}
const mapDispatchToProps = dispatch => ({
  addNewQuestion: ( data ) => dispatch(createQuestion(data )),
});

const mapStateToProps=({ authedUser })=> {
  return {
    authedUser
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddQuestion)
