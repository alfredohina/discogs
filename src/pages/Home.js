import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components'


const StTextField = withStyles({
  root: {
    width: 300,
    marginBottom: 30,
  },
})(TextField);

const Radios = withStyles({
  root: {
    heigth: 0,
    padding: "0px 10px",
  },
})(Radio);

const FlexRadius = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  `

const PRadius = styled.p`
  margin: 10px;
  `

const Pagination = styled.p`
  margin: 20px;
  `

const List = styled.li`
  list-style-type: none; 
  `

class _Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      searchType: "",
      data: [],
      pagination: 1,
      totalPages: 0,
    }
  }

  static removeFromStore(c, t) {
    t.dispatch({
      type: "REMOVE_FROM_COLLECTION",
      collection: c,
    })
  }

  static addToStore(c, t, i) {
    t.dispatch({
      type: "ADD_TO_COLLECTION",
      collection: c,
    })
  }

  changePageMore() {
    this.setState(
      { pagination: this.state.pagination + 1 },
      () => this.searchData()
    )
  }

  changePageLess() {
    this.setState(
      { pagination: this.state.pagination - 1 },
      () => this.searchData()
    )
  }

  searchData() {
    if (this.state.searchInput === "") {
      setTimeout(() => {
        this.setState({
          message: false
        })
      }, 3000);
      return this.setState({
        message: true
      })
    }
    return axios.get(`https://api.discogs.com/database/search?q=${this.state.searchInput}&type=${this.state.searchType}&per_page=3&page=${this.state.pagination}&token=gCGETrFVyKJqymVrVpesIWmMbfLtdRwazehrJfRq`).then(res => {
      const allResData = res.data.results.map(e => {
        var e
        this.props.collection.map(i => {
          if (i.id === e.id) {
            e.validation = true
          }
        })
        return e
      })
      this.setState({
        data: allResData,
        totalPages: res.data.pagination.pages
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">

          <StTextField
            id="outlined-name"
            label="What are you looking for?"
            classes={"afocused"}
            value={this.state.searchInput}
            onChange={e => this.setState({ searchInput: e.target.value })}
            margin="normal"
            variant="outlined"
          />

          <FlexRadius>
            <Radios
              checked={this.state.searchType === ""}
              onChange={e => this.setState({ searchType: "" })}
              value="both"
              name="radio-button-demo"
              aria-label="A"
            />
            <PRadius>Artist and Album</PRadius>
          </FlexRadius>
          <FlexRadius>
            <Radios
              checked={this.state.searchType === 'artist'}
              onChange={e => this.setState({ searchType: "artist" })}
              value="artist"
              name="radio-button-demo"
              aria-label="A"
            />
            <PRadius>Artist</PRadius>
          </FlexRadius>
          <FlexRadius>
            <Radios
              checked={this.state.searchType === 'release'}
              onChange={e => this.setState({ searchType: "release" })}
              value="release"
              name="radio-button-demo"
              aria-label="A"
            />
            <PRadius>Album</PRadius>
          </FlexRadius>

          {this.state.message ? (
            <p>Write for an artist or album</p>
          ) :
          <Button variant="contained" color="primary" onClick={e => this.searchData()}>
            Search
          </Button>}


          {this.state.data.length > 0 ?

            <div>

              <ul>
                {this.state.data.map(function (params, i) {
                  return <List
                    key={params.id}
                  >

                    {params.type === "artist" ?
                      <div>
                        <NavLink exact activeStyle={{ color: "white" }} to={{
                          pathname: "/artist/" + `${params.id}`,
                          params
                        }}
                        >
                          {params.title}
                        </NavLink>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={params.validation}
                          onClick={() => Home.addToStore(params, this.props, i)}
                        >
                          FAV
                        </Button>
                      </div>
                      :
                      <div>
                        <NavLink exact activeStyle={{ color: "white" }} to={{
                          pathname: "/album/" + `${params.id}`,
                          params
                        }}
                        >
                          {params.title}
                        </NavLink>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={params.validation}
                          onClick={() => Home.addToStore(params, this.props, i)}
                        >
                          FAV
                        </Button>
                      </div>
                    }
                  </List>
                }, this
                )}
              </ul>

              <FlexRadius>
                <Button
                  variant="contained"
                  onClick={e => this.changePageLess()}
                  disabled={this.state.pagination <= 1}
                >
                  -1
                </Button>

                <Pagination>{this.state.pagination}</Pagination>

                <Button
                  variant="contained"
                  onClick={e => this.changePageMore()}
                  disabled={this.state.pagination >= this.state.totalPages}
                >
                  +1
                </Button>
              </FlexRadius>

            </div>
            :
            null
          }


          <Divider variant="middle" />

          {this.props.collection.length > 0 ?
          <p>FAVORITE LIST</p> : null}


          {this.props.collection.map(function (params) {
            console.log(params)
            return <List
              key={params.id}
            >

              {params.type === "artist" ?

                <div>
                  <NavLink exact activeStyle={{ color: "white" }} to={{
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
                  <NavLink exact activeStyle={{ color: "white" }} to={{
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
            </List>
          }, this
          )}

        </div>

      </div>
    );
  }
}


export const Home = connect(store => store)(withRouter(_Home));