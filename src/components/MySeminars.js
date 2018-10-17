import React, { Component } from 'react'
import {connect} from 'react-redux'
import SeminarsTable from "./seminarsTable"
import Button from '@material-ui/core/Button/Button';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom';

class MySeminars extends Component {
    
    
    render() {
        const {mySeminars} = this.props;
        return (
            <div className="home container">
                <h2>My Seminars</h2>
                <Button style={{float:'right'}} variant="contained" color="primary" component={Link} to="/create-seminar">Add Seminar</Button>
                <br/>
                <br/>
                <SeminarsTable seminars={mySeminars} seminarPageLink="/my-seminar-details/"/>
            </div>
        )
    }
}

//Grabbing Project objects from the store 
const mapStateToProps = (state) => {
    let userId = state.firebase.auth.uid; /*firebase.auth().currentUser.uid;*/

    let seminars = state.firestore.data.seminars;
    let mySeminars = [];

    if(seminars !== undefined) {
        mySeminars = Object.keys(seminars).map(seminarId => {
            if(seminars[seminarId].organiser === userId ){
                seminars[seminarId].id = seminarId;
                return seminars[seminarId];
            }
        });
    
        Array.prototype.clean = function(deleteValue) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === deleteValue) {         
                this.splice(i, 1);
                i--;
              }
            }
            return this;
        };
          
    
            //
        //const seminar = seminars ? seminars[id] : null
    
        mySeminars.clean(undefined);
    
    }
    

    return {
        mySeminars: mySeminars
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'seminars' }
    ])
)(MySeminars)