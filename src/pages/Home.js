import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import {  addToColl  } from '../lib/Redux/actions';
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";



class _Home extends React.Component {
  constructor(){
    super();
    this.state = {
      searchInput: "",
      searchType: "",
      data: [],
      pagination: 1,
      totalPages: 0,
    }
  }

  static removeFromStore(c, t){
    t.dispatch({
      type: "REMOVE_FROM_COLLECTION",
      collection: c,
    })
  }

  static addToStore(c, t){
     t.dispatch({
       type: "ADD_TO_COLLECTION",
       collection: c,
     })
  }

  changePageMore(){
    this.setState(
      {pagination:this.state.pagination+1},
      () => this.searchData()
      )
  }

  changePageLess(){
    this.setState(
      {pagination:this.state.pagination-1},
      () => this.searchData()
      )
  }

  searchData() {
    if (this.state.searchInput === ""){
      setTimeout(() => {
        this.setState({
          message: false
        })
      }, 3000);
      return this.setState({
        message: true
      })
    }
    const search = this.state.searchInput
    return axios.get(`https://api.discogs.com/database/search?q=${this.state.searchInput}&type=${this.state.searchType}&per_page=3&page=${this.state.pagination}&token=gCGETrFVyKJqymVrVpesIWmMbfLtdRwazehrJfRq`).then(res => {
      const allResData = res.data.results.map(e => e)
      this.setState({
        data: allResData,
        totalPages: res.data.pagination.pages
      })
    }).catch(err => {
      console.log(err); 
    })
  }

  checkState() {
      console.log(this.props)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>Search Artis, Album or both</p>
          <input
            value={this.state.searchInput}
            onChange={e => this.setState({searchInput:e.target.value})}
          />

<input type="radio" value="both" checked={this.state.searchType === ""} onChange={e => this.setState({searchType:""})} />Artist and Album
<input type="radio" value="artist" checked={this.state.searchType === 'artist'} onChange={e => this.setState({searchType:"artist"})} />Artist
<input type="radio" value="release" checked={this.state.searchType === 'release'} onChange={e => this.setState({searchType:"release"})} />Album

{this.state.message ? (
  <p>Write for an artist or album</p>
):('')}

          <button onClick={e => this.searchData()}>
            Launch API
          </button>
          
          <button onClick={e => this.checkState()}>
            Check STATE
          </button>

          {this.state.data.length > 0 ? 
          
          <div>
            
          <ul>
          {this.state.data.map(function(params){            
              console.log(params)
            return <li 
            key={params.id}
            >


            {params.type === "artist" ? 
            <div>
            <NavLink exact activeStyle={{color:"white"}} to={{
              pathname: "/artist/" + `${params.id}`,
              params
            }}
            >
            {params.title}
            </NavLink>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Home.addToStore(params, this.props)}
            >
              LOVE
            </Button>
            </div>
             : 
             <div>
             <NavLink exact activeStyle={{color:"white"}} to={{
                pathname: "/album/" + `${params.id}`,
                params
            }}
            >
            {params.title}
            </NavLink>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Home.addToStore(params, this.props)}
            >
              LOVE
            </Button>
            </div>
            }
            </li>
          },this
          )}
        </ul>

          <button
            onClick={e => this.changePageLess()}
            disabled={this.state.pagination <= 1}
          >
          -1
        </button>
        <p>{this.state.pagination}</p>
        <button 
          onClick={e => this.changePageMore()}
          disabled={this.state.pagination >= this.state.totalPages}
        >
          +1
        </button>
        
        </div>
        :
        
        <p>Nothing to show</p>
        }
    
        </div>



        <p>----------</p>
        <p>FAVORITE LIST</p>

          



          {this.props.collection.map(function(params){            
            console.log(params)
          return <li 
          key={params.id}
          >

          {params.type === "artist" ? 


          <div>
          <NavLink exact activeStyle={{color:"white"}} to={{
            pathname: "/artist/" + `${params.id}`,
            params
          }}
          >
          {params.title}
          </NavLink>

          <Button
              variant="contained"
              color="primary"
              onClick={() => Home.removeFromStore(params, this.props)}
            >
              DELETE
            </Button>


          </div>
           : 
           <div>
           <NavLink exact activeStyle={{color:"white"}} to={{
              pathname: "/album/" + `${params.id}`,
              params
          }}
          >
          {params.title}
          </NavLink>

            <Button
              variant="contained"
              color="primary"
              onClick={() => Home.removeFromStore(params, this.props)}
            >
              DELETE
            </Button>

          </div>
        
        }
        </li>
        },this
        )}





      </div>
    );
  }
}

export const Home = connect(store => store)(withRouter(_Home));