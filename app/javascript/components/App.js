import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './Users/Users';
import User from './User/User';
import Footer from '../containers/Footer';
import NavBar from '../containers/NavBar'

const App = () => {
  return <Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Users}/>
        <Route exact path="/users/:id" component={User}/>
      </Switch>
      <Footer />
  </Fragment>
}

export default App;
