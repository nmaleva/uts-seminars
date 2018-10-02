import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import RegistrationForm from './registrationForm'

//Grabbing Project objects from the store 
const mapStateToProps = (state) => {
    return {
        seminars: state.seminar.seminars
    }
}

const SeminarDetails = (props) => {

    //grab ID of seminar from url parameters
    const id = props.match.params.id
    console.log(props.seminars);

    //Grab seminar from seminar list in state
    const seminar = props.seminars.find(seminar => id == seminar.id)
    console.log(seminar);
    if(seminar != null) {
        return (
            <div className="container">
                <h3> {seminar.title} - ID: {id} </h3>

                <h4>Abstract: </h4> {seminar.abstract}

                <h4> Room: </h4> {seminar.venue}

                <p> put the other stuff here </p>

                < RegistrationForm />
            </div>
        )
    } else if (seminar == null) {
        return (
            <div className="container">
                Sorry this seminar does not exist!
            </div>
        )
    }
}


export default connect(mapStateToProps)(SeminarDetails)