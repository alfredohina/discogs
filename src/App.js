import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  testApi() {
    return axios.get("https://api.discogs.com/releases/249504").then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err); 
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Search Artis, Album or both</p>
          <button onClick={this.testApi}>
            Launch API
          </button>
        </header>
      </div>
    );
  }
}

export default App;
