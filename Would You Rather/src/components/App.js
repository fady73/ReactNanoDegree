import React, { Component,Fragment} from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Leaderboard from './Leaderboard/Leaderboard'
import NavBar from './Nav/NavBar'
import Dashboard from './Dashboard/Dashboard'
import AddQuestion from './AddQuestion/AddQuestion'
import Login from './Login/Login'
import ProtectedRoute from './../utils/ProtectedRoute'
import './App.css';
import LoadingBar from 'react-redux-loading'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './NotFound/NotFound';
import AddAnswer from './AddAnswer/AddAnswer';
import ViewResult from './ViewResult/ViewResult'
class App extends Component {
  componentDidMount() {
    const {getInitialData}=this.props;
    getInitialData();
  }
  render() {
    const {loading} =this.props;
    return (
      <div className="App">
     
      <BrowserRouter>
          <Fragment>
          <LoadingBar/>
          <NavBar/>
            {loading === true ? null : (
            <Switch>
                <Route exact path="/" component={Login}/>
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/leaderboard" component={Leaderboard} />
                <ProtectedRoute exact path="/create" component={AddQuestion} />
                <ProtectedRoute exact path="/answer/:question_id" component={AddAnswer}  />
                <ProtectedRoute exact path="/results/:question_id" component={ViewResult} />
                <ProtectedRoute component={NotFound}/>

            </Switch>)}
          </Fragment>
      </BrowserRouter>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  getInitialData: () => dispatch(handleInitialData()),
});
const mapStateToProps= ({authedUser})=>{
  return {
    userId: authedUser.userId,

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
