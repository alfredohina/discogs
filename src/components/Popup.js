import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

const Txt = styled.p`
  color: #0066cc;
  margin: 1px;
`

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const List = styled.li`
  list-style-type: none; 
  margin: 3px;
`

const FlexRadius = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Pagination = styled.p`
  margin: 0px 20px;
  color: black;
`
const CloseTxt = styled.p`
  margin: 20px;
  color: black;
  width: 100px;
  text-align: center;
  background-color: tomato;
`

const Close = styled.div`
  float: right;
`

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
          <Ul>
            {this.state.albums.map(function (params) {
              console.log(params)
              return <List
                key={params.id}
              >

                <Txt>{params.year} · </Txt>
                <Txt>{params.title}</Txt>

              </List>
            }
            )}
          </Ul>



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


          <Close onClick={this.props.closePopup}>
            <CloseTxt>CLOSE</CloseTxt>
          </Close>


        </div>
      </div>
    );
  }
}