import React from 'react'
import { connect } from 'react-redux'
import RegistrationForm from '../components/RegistrationForm'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import AttendeeTable from '../components/AttendeesTable'
import SeminarDetailsContent from '../components/SeminarDetailsContent'

const SeminarDetails = (props) => {
    //grab ID of seminar from url parameters
    const id = props.match.params.id
    const { seminar, attendees } = props;

    if (seminar != null) {
        return (
            <div className="container">
                < SeminarDetailsContent seminar={seminar} />
                <h2> Register Attendance </h2>
                < RegistrationForm attendees={attendees} seminarId={id} />
                <br />
                <h2> List of Attendees </h2>
                < AttendeeTable seminarId={id} />
            </div>
        )
    } else if (seminar == null) {
        return (
            <div className="container">
                <br />
                Seminar is loading ...
            </div>
        )
    }
}

/**
 * Saves Seminar and Attendees of the Seminar into Props for use
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const id = ownProps.match.params.id;
    const seminars = state.firestore.data.seminars;
    const seminar = seminars ? seminars[id] : null
    return {
        seminar: seminar,
        attendees: (state.firestore.data['seminars/' + id + '/attendees']) ? state.firestore.data['seminars/' + id + '/attendees'] : []
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'seminars' },
        { collection: 'seminars/' + props.match.params.id + '/attendees' }
    ])
)(SeminarDetails)
