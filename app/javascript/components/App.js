import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './Users/Users';
import User from './User/User';

const App = () => {
  return (
  <Switch>
    <Route exact path="/" component={Users}/>
    <Route exact path="/users/:id" component={User}/>
  </Switch>
  )
}

export default App;
