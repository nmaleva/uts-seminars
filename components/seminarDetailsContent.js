import React from 'react'
import ReactDOM from 'react-dom'

const SeminarDetailsContent = (props) => {

    //grab ID of seminar from url parameters
    const {seminar} = props;
    //Grab seminar from seminar list in state
   // const seminar = props.seminars.find(seminar => id == seminar.id)
    return (
        <div className="container">
            <h1> {seminar.title} </h1>

            <b> Abstract: </b> {seminar.abstract}
            <br/>
            <b> Room: </b> {seminar.venue}
            <br/>
            <b> Speaker: </b> {seminar.speaker}
            <br/>
            <b> Speaker Bio: </b> {seminar.speakerBio}
            <br/> 
            <b> Host </b> {seminar.host}
            <br/> 
            <b> Date </b> {seminar.date}
            <br/> 
            <b> Time </b> {seminar.time}
            <br/> 
            <b> Duration </b> {seminar.duration} minutes
            <br/> 
        </div>
    )

}

export default SeminarDetailsContent