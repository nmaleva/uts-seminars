import React from 'react'
import {connect} from 'react-redux'
import RegistrationForm from './registrationForm'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import AttendeeTable from './attendeesTable'
import DeleteSeminar from './DeleteSeminar'
import SeminarUpdate from './seminarUpdate'
import SeminarDetailsContent from './seminarDetailsContent'


const MySeminarDetails = (props) => {
    //grab ID of seminar from url parameters
    const id = props.match.params.id
    const {seminar, attendees} = props;

    //Grab seminar from seminar list in state
   // const seminar = props.seminars.find(seminar => id == seminar.id)
    if(seminar != null) {
        return (
            <div className="container">
                < SeminarDetailsContent seminar={seminar} />
                <br/>
                <div style={{width: '400px',margin:'auto', 'marginBottom':'10%'}}>
                    <div style={{float:'left'}}> < SeminarUpdate seminarId= {id} seminar={seminar}/> </div>
                    <div style={{float:'right'}}> < DeleteSeminar id={id} /> </div>
                </div>
                
                <h2> Register an Attendee </h2>
                < RegistrationForm attendees={attendees} seminarId={id} />
                <br/>
                <h2> Attendee List </h2>
                < AttendeeTable seminarId={id} />
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
    firestoreConnect((props) => [
        { collection: 'seminars' },
        { collection: 'seminars/'+ props.match.params.id +'/attendees'}
    ])
)(MySeminarDetails)