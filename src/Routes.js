import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Register from './Components/Auth/Register'
import Landing from './Components/UI/Landing'

export default (
    <Switch>
        <Route exact path = '/register' component={Register}/>
        <Route exact path = '/' component={Landing}/>
    </Switch>
)
