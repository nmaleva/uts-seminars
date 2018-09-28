import React, { Component } from 'react';
import firebase from 'firebase'
import {app, base} from '../base';

class database extends Component {
    constructor() {
        super()
        this.state = {
            seminars:[]
        }

        
    }

    componentWillMount() {
        // const previousSeminars = this.state.seminars;

        // this.database.on('child_added', snap => {
        //     previousSeminars.push({

        //     })
        // })

        this.seminarsRef = base.syncState('seminars/seminar1', {
            context: this,
            state: 'seminars'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.seminarsRef)
    }

    render() {
        return (
            <div>
                <h1> Seminar Details </h1>
                <p> title: {this.state.seminars.title} </p>
                <p> abstract: {this.state.seminars.abstract} </p>
                <p> venue: {this.state.seminars.venue} </p>
            </div>
        )
    }
}

export default (database);