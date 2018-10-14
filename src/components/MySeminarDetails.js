import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import RegistrationForm from './registrationForm'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import AttendeeTable from './attendeesTable'
import DeleteSeminar from './DeleteSeminar'



const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("button clicked");
    //this.props.addAttendee(this.state,this.props.seminarId);
}

const MySeminarDetails = (props) => {

    
    //grab ID of seminar from url parameters
    const id = props.match.params.id
    console.log(props);
    const {seminar} = props;

    //Grab seminar from seminar list in state
   // const seminar = props.seminars.find(seminar => id == seminar.id)
    console.log(seminar);
    if(seminar != null) {
        return (
            <div className="container">
                <h3> {seminar.title} - ID: {id} </h3>

                <b> Abstract: </b> {seminar.abstract}
                <br/>
                <b>  Room: </b> {seminar.venue}

                <p> put the other stuff here </p>
                <DeleteSeminar id={id}/>

                < RegistrationForm seminarId={id}/>
                < AttendeeTable seminarId={id}/>
            </div>
        )
    } else if (seminar == null) {
        return (
            <div className="container">
                Seminar is loading ....
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const id = ownProps.match.params.id;
    const seminars = state.firestore.data.seminars;
    const seminar = seminars ? seminars[id] : null
    return {
        seminar: seminar
        //seminars: (state.firestore.ordered.seminars != undefined) ? state.firestore.ordered.seminars : []
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'seminars' }
    ])
)(MySeminarDetails)