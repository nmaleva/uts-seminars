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
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'


const MySeminarDetails = (props) => {
    //grab ID of seminar from url parameters
    const id = props.match.params.id
    const {seminar} = props;

    //Grab seminar from seminar list in state
   // const seminar = props.seminars.find(seminar => id == seminar.id)
    console.log(seminar);
    if(seminar != null) {
        return (
            <div className="container">
                < SeminarDetailsContent seminar={seminar} />
                < SeminarUpdate seminarId= {id} seminar={seminar}/> 
 
                <DeleteSeminar id={id}/>

                < RegistrationForm seminarId={id}/>
                < AttendeeTable seminarId={id}/>
                <Button></Button>
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
        seminar: seminar
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'seminars' }
    ])
)(MySeminarDetails)