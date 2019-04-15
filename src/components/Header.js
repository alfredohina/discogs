import React, {Component} from 'react'
import styled from 'styled-components'


const WeHeader = styled.div`
    text-align: center;
    background: #0066cc;
    position: fixed;
    left:0px;
    top:0px;
    height:55px;
    width:100%;
    z-index:5;
`

const Logo = styled.img`
    margin: 10px;
`

export class Header extends Component {
    render() {
        return (
            <WeHeader>
                <Logo src='../images/logo.png' />
            </WeHeader>
        )
    } 
}