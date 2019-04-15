import React, { Component } from "react";
import axios from 'axios';
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const Ul = styled.ul`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
`;


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
            <div className="App-header">

                <p>{params.id}</p>
                <p>{params.title}</p>
                <img src={params.cover_image} />
                <p>{params.type}</p>
                <p>Tracklist:</p>

                {this.state.data.tracklist ?
                    <Ul>
                        {this.state.data.tracklist.map(function (track) {
                            console.log(track)
                            return <div style={{ width: 200, height: 200, margin: 20 }}>
                                <Card key={track.position}>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {track.position}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {track.title}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {track.duration}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>

                        }
                        )}
                    </Ul>
                    : null}

            </div>
        )
    }
}