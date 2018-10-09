import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import SeminarsTable from "./seminarsTable"
import Button from '@material-ui/core/Button/Button';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Home extends Component {
    render() {
        console.log(this.props);
        const {seminars} = this.props;
        return (
            <div className="home container">
                <h2>Welcome to Homepage!</h2>
                <SeminarsTable seminars={seminars} />
            </div>
        )
    }
}

//Grabbing Project objects from the store 
const mapStateToProps = (state) => {
    console.log(state);
    return {
        seminars: (state.firestore.ordered.seminars != undefined) ? state.firestore.ordered.seminars : []
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'seminars' }
    ])
)(Home)