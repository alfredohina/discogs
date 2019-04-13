import React, { Component } from "react";
import axios from 'axios';


export class Album extends Component {
    constructor() {
        super();
        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        const url = `https://api.discogs.com/artists${this.props.location.pathname}`
        return axios.get(url).then(res => {
            this.setState({
                data: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }


    launchReleases() {
        const url = `https://api.discogs.com/artists${this.props.location.pathname}/releases`
        return axios.get(url).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const params = this.props.location.params
        return (
            <div>
                <button
                    onClick={e => this.launchReleases()}
                >
                    Detail
                    props
                </button>
                <p>{params.id}</p>
                <p>{params.title}</p>
                <img src={params.cover_image} />
                <p>{params.type}</p>
            </div>
        )
    }
}