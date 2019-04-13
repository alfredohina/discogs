import React, { Component } from "react";
import axios from 'axios';


export class Album extends Component {
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
        const url = this.props.location.params.resource_url
        console.log(url)
        return axios.get(url).then(res => {
            this.setState({
                data: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const params = this.props.location.params
        return (
            <div>
                <button
                    onClick={e => console.log(this.state)}
                >
                    Detail
                    props
                </button>
                <p>{params.id}</p>
                <p>{params.title}</p>
                <img src={params.cover_image} />
                <p>{params.type}</p>
                <p>Tracklist:</p>

                {this.state.data.tracklist ? 
                <ul>
                    {this.state.data.tracklist.map(function (track) {
                        console.log(track)
                        return <li
                            key={track.position}
                        >
                            <p>{track.position + " - " + track.duration + "  " + track.title}</p>

                        </li>
                    }
                    )}
                </ul>
                : null }

                <button
                onClick={() => console.log(this.state.data.tracklist)}
                >STATE</button>


            </div>
        )
    }
}