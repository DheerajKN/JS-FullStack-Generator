import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home.js';
import Users from './components/User.js';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/" exact component={Home} />
      </Switch>
    );
  }
}
