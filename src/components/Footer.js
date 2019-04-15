import React, {Component} from 'react'
import styled from 'styled-components'

const WebFooter = styled.div`
    text-align: center;
    background: #0066cc;
    left:0px;
    position: fixed;
    bottom:0px;
    height:40px;
    width:100%;
`

const Sign = styled.p`
    color: white;
    padding-top: 10px;
    margin: 0px;
`

export class Footer extends Component {
    render() {
        return (
            <WebFooter>
                <Sign>2019 © Alfredo Hinarejos Corberá</Sign>
            </WebFooter>
        )
    }
}