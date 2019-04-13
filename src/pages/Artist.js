import React, { Component } from "react";
import axios from 'axios';
import { Popup } from "./Popup"


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
            <div>

                <p>{data.id}</p>
                <p>{data.title}</p>
                <p>{data.type}</p>
                <p>{params.profile}</p>
                <img src={data.cover_image} />
                <p>{params.type}</p>

                <div>
                    <button onClick={this.togglePopup.bind(this)}>Show {data.title} albums</button>
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