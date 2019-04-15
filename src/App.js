import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Artist } from './pages/Artist';
import { Album } from './pages/Album';
import Error404 from './pages/404';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header';
import { Layout } from './components/Layout'
import { LayoutOut } from './components/LayoutOut'
import './App.css';


class _App extends Component {
 
  render() {
    return (
      <div>
          <Header/>
            <Layout/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/artist/:id" component={Artist} />
                <Route exact path="/album/:id" component={Album} />
                {/* <Route component={Error404} /> */}
              </Switch>
            <LayoutOut/>
          <Footer/>
      </div>
    );
  }
}

export const App = connect(store => store)(withRouter(_App));