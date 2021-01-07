import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/UI/Landing'
import Register from './Components/Auth/Register'
import Signin from './Components/Auth/Signin'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/signin' component={Signin}/>
    </Switch>
)
