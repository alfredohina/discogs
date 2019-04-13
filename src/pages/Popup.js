import React, { Component } from 'react';
import axios from 'axios';

export class Popup extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      albums: [],
      pagination: 1,
      totalPages: 0
    }
  }

  changePageMore() {
    this.setState(
      { pagination: this.state.pagination + 1 },
      () => this.launchReleases()
    )
  }

  changePageLess() {
    this.setState(
      { pagination: this.state.pagination - 1 },
      () => this.launchReleases()
    )
  }

  launchReleases() {
    const url = this.state.url
    return axios.get(url + `?per_page=3&page=${this.state.pagination}`).then(res => {
      const albums = res.data.releases.map(e => e)
      this.setState({
        albums: albums,
        totalPages: res.data.pagination.pages
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.setState({
      url: this.props.text
    },
      () => this.launchReleases()
    )
  }

  render() {
    return (
      <div className='modal'>
        <div className='modalCard'>
          <ul>
            {this.state.albums.map(function (params) {
              console.log(params)
              return <li
                key={params.id}
              >

                <p>{params.title}</p>
                <p>{params.year}</p>

              </li>
            }
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

          <button onClick={this.props.closePopup}>CLOSE</button>
        </div>
      </div>
    );
  }
}