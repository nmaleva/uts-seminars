import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import RegistrationForm from './registrationForm'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import AttendeeTable from './attendeesTable'
import SeminarUpdate from './seminarUpdate'
import SeminarDetailsContent from './seminarDetailsContent'

const SeminarDetails = (props) => {

    //grab ID of seminar from url parameters
    const id = props.match.params.id
    console.log(props);
    const {seminar,attendees} = props;
   // console.log(attendees);

    //Grab seminar from seminar list in state
   // const seminar = props.seminars.find(seminar => id == seminar.id)
    console.log(seminar);
    if(seminar != null) {
        return (
            <div className="container">
                < SeminarDetailsContent seminar={seminar} />

                <h2> Register Attendance </h2>
                < RegistrationForm attendees={attendees} seminarId={id}/>
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
        seminar: seminar,
        attendees: (state.firestore.data['seminars/'+id+'/attendees']) ? state.firestore.data['seminars/'+id+'/attendees'] : []
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect( (props) => [
        { collection: 'seminars' },
        { collection: 'seminars/'+ props.match.params.id +'/attendees'}
    ])
)(SeminarDetails)
