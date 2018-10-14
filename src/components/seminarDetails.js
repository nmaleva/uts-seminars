import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import RegistrationForm from './registrationForm'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import AttendeeTable from './attendeesTable'
import SeminarUpdate from './seminarUpdate'

const SeminarDetails = (props) => {

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
                <h1> {seminar.title} </h1>

                <b> Abstract: </b> {seminar.abstract}
                <br/>
                <b>  Room: </b> {seminar.venue}
                <br/>
                <b>  Speaker: </b> {seminar.speaker}
                <br/>
                <b> Host </b> {seminar.host}
                <br/> 
                <b> Date </b> {seminar.date}
                <br/> 
                <b> Time </b> {seminar.time}
                <br/> 
                <b> duration </b> {seminar.duration} minutes
                <br/> 

                <h2> Register Attendance </h2>
                < SeminarUpdate seminarId= {id} seminar={seminar} />
                < RegistrationForm seminarId={id}/>
                <br/>
                <h2> List of Attendees </h2>
                < AttendeeTable seminarId={id}/>
            </div>
        )
    } else if (seminar == null) {
        return (
            <div className="container">
                Seminar is loading ...
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
)(SeminarDetails)
