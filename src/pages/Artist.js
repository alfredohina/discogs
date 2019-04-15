import React, { Component } from "react";
import axios from 'axios';
import { Popup } from "../components/Popup"
import styled from 'styled-components'
import Button from '@material-ui/core/Button';


const Paragraph = styled.p`
  margin: 10px 60px;
  `

export class Artist extends Component {
    constructor() {
        super();
        this.state = {
            data: "",
            showModal: false
        }
    }

    togglePopup() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    componentDidMount() {
        const url = `https://api.discogs.com/artists/${this.props.match.params.id}`
        return axios.get(url).then(res => {
            this.setState({
                data: res.data,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const params = this.state.data
        const data = this.props.location.params
        return (
            <div className="App-header">

                <Paragraph>{data.id}</Paragraph>
                <Paragraph>{data.title}</Paragraph>
                <Paragraph>{data.type}</Paragraph>
                <Paragraph>{params.profile}</Paragraph>
                <img src={data.cover_image} />
                <Paragraph>{params.type}</Paragraph>

                <div>
                    <Button variant="contained" color="primary" onClick={this.togglePopup.bind(this)}>
                    Show {data.title} albums
                    </Button>

                    {this.state.showModal ?
                        <Popup
                            text={this.state.data.releases_url}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>


            </div>
        )
    }
}