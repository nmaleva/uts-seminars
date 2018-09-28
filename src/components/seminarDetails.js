import React from 'react'
import RegistrationForm from './registrationForm'

const SeminarDetails = (props) => {
    return (
        <div className="container">
            <h3>Heading</h3>

            <h4>Description: </h4> This is some type of Description

            <h4> Room: </h4> CB11.01.101

            <p> put the other stuff here </p>

            < RegistrationForm />
        </div>

    )
}

export default SeminarDetails