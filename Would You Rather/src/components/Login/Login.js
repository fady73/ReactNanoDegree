import React, { Component, Fragment } from 'react'
import {Form,Button,Col,Row,Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleLoginUser } from '../../actions/authedUser.js'
import {Redirect} from 'react-router-dom';
class Login extends Component {
  state = {
    user: undefined
  }

  handleChange = (e) => {
    this.setState({user:e.target.value})
  }
handleSubmit=(e)=>{
  const {setLoginUser} =this.props
  const {user}=this.state
  e.preventDefault(); 
  setLoginUser(user)
}
  render() {
    const {users, authedUser} =this.props
    const {user}=this.state
    return authedUser!==undefined ? <Redirect to='/dashboard'/> :
      (
        <Fragment>
        <Container fluid="md">
        <Row className="p-3">
          <Col  xs={6}>
     
          <Form id="Login" onSubmit={this.handleSubmit}>
              <Form.Group >
              <Form.Label>Login</Form.Label>
              <Form.Control as="select" name='select' placeholder="select user to login"  value={user||"none"}
                    onChange={(e) => this.handleChange(e)}>
                      <option disabled  value="none">select user to login</option>
                  {Object.keys(users).map((singleUser) =>
                      <option key={users[singleUser].id}
                              value={users[singleUser].id}>{users[singleUser].name}
                      </option>
                  )}
              </Form.Control>
              </Form.Group >
            <Button  variant="primary"  type="submit" value='Submit' disabled={user===undefined}>Sign in
            </Button>
          </Form>
        </Col>
      </Row></Container>        </Fragment>
)
    }
}
const mapDispatchToProps = dispatch => ({
  setLoginUser: Id => dispatch(handleLoginUser(Id)),
});
const mapStateToProps= state=>{
  return {
    users:state.users,
    authedUser: state.authedUser.userId
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)

