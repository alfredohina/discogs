import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      searchInput: "",
      searchTypeArtist: "",
      searchTypeAlbum: "",
      data: [],
      pagination: 1
    }
  }

  changePageMore(){
    console.log(this.state.pagination)
    this.setState({pagination:this.state.pagination+1})
    this.searchData()
  }

  changePageLess(){
    console.log(this.state.pagination)
    this.setState({pagination:this.state.pagination-1})
    this.searchData()
  }

  searchData() {
    // this.setState({searchInput:""})
    const search = this.state.searchInput
    return axios.get(`https://api.discogs.com/database/search?q=${this.state.searchInput}&type=${this.state.searchType}&per_page=3&page=${this.state.pagination}&token=gCGETrFVyKJqymVrVpesIWmMbfLtdRwazehrJfRq`).then(res => {
      const allResData = res.data.results.map(e => e)
      this.setState({
        data: allResData,
        activation: true,
      })
      console.log(res.data.pagination.items)
    }).catch(err => {
      console.log(err); 
    })
  }

  checkState() {
      console.log(this.state.data)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Search Artis, Album or both</p>
          <input
            value={this.state.searchInput}
            onChange={e => this.setState({searchInput:e.target.value})}
          />

<input type="radio" value="both" checked={this.state.searchType === ""} onChange={e => this.setState({searchType:""})} />Artist and Album
<input type="radio" value="artist" checked={this.state.searchType === 'artist'} onChange={e => this.setState({searchType:"artist"})} />Artist
<input type="radio" value="album" checked={this.state.searchType === 'release'} onChange={e => this.setState({searchType:"release"})} />Album


          <button onClick={e => this.searchData()}>
            Launch API
          </button>

          <button onClick={e => this.checkState()}>
            Check STATE
          </button>

          {this.state.data.length > 0 ? 
          
          <div>
          <button onClick={e => this.changePageLess()}>
          -1
        </button>

        <button onClick={e => this.changePageMore()}>
          +1
        </button>

          <ul>
          {this.state.data.map(function(b){
            return <li 
            key={b.id}
            >
           {b.title}
            </li>
            }
          )}
        </ul>
        </div>
        :
        
        <p>Nothing to show</p>
        }


        </header>
      </div>
    );
  }
}

export default App;
