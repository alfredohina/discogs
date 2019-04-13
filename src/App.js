import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Artist } from './pages/Artist';
import { Album } from './pages/Album';
import Error404 from './pages/404';


import './App.css';

class App extends Component {
 

  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/artist/:id" component={Artist} />
            <Route exact path="/album/:id" component={Album} />
            <Route component={Error404} />
          </Switch>
      </div>
    );
  }
}

export default App;