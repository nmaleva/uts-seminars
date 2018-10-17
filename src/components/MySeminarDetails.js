import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import RegistrationForm from './registrationForm'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import AttendeeTable from './attendeesTable'
import DeleteSeminar from './DeleteSeminar'
import SeminarUpdate from './seminarUpdate'
import SeminarDetailsContent from './seminarDetailsContent'
import Button from '@material-ui/core/Button'


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
                < SeminarUpdate seminarId= {id} seminar={seminar}/> 
                <br/>
                <DeleteSeminar id={id}/>
                < RegistrationForm attendees={attendees} seminarId={id}/>
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