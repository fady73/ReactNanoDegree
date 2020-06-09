import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
const ProtectedRoute = ({component: Component, ...rest }) => {
    const { authedUser }  = rest
    return(
        <Route
            {...rest}
            render={(props) => (
               authedUser.userId!==undefined
                    ? 
                    <Component {...props} />
                    :  <Redirect to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
            )}
        />
    )
}

const  mapStateToProps=({authedUser})=>{
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(ProtectedRoute)
