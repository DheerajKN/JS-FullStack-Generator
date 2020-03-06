import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home.js';
import Address from './components/Address.js';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/addresses" component={Address} />
        <Route path="/" exact component={Home} />
      </Switch>
    );
  }
}
