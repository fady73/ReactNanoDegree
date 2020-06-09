import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleLogoutUser } from '../../actions/authedUser'
class NavBar extends Component {
  render() {
    const { authedUser, setLogoutUser } = this.props
    const { name } = this.props.user || ''
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand >Would You Rather</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authedUser !== undefined ? (
            <Fragment>
              <Nav className="mr-auto">
                <NavItem className="pr-3">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/leaderBoard">LeaderBoard</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/create">Add Question</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/login" onClick={() => {
                    setLogoutUser()
                  }}>Log Out
                  </NavLink>
                </NavItem>
              </Nav>

              <Navbar.Text className="justify-content-end">
                Signed in as:  {name}
              </Navbar.Text>
            </Fragment>
          ) : ''}


        </Navbar.Collapse>
      </Navbar>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  setLogoutUser: () => dispatch(handleLogoutUser()),
});
const mapStateToProps = state => {
  return {
    authedUser: state.authedUser.userId,
    user: state.users[state.authedUser.userId]
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

