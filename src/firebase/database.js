import React, { Component } from 'react';
import firebase from 'firebase'
import database from './base';

export default class database2
 extends Component {
    constructor() {
        super()
        this.state = {
            seminars:[]
        }

        
    } 
    // componentWillMount() {
    //     // const previousSeminars = this.state.seminars;
    //     // this.database.on('child_added', snap => {
    //     //     previousSeminars.push({
    //     //     })
    //     // })
    //     this.seminarsRef = firebase.database().ref('/');
    // }

    // componentWillUnmount() {
    //     database.removeBinding
    //     base.removeBinding(this.seminarsRef)
    // }

    render() {
        return (
            <div>
                <h1> Seminar Details </h1>
                <p> title: {this.state.seminars.title} </p>
                <p> abstract: {this.state.seminars.abstract} </p>
                <p> venue: {this.state.seminars.venue} </p>
            </div>
        )
    };
}