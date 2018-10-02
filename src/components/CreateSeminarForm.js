import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSeminar } from '../actions/seminarActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


class CreateSeminarForm extends Component {
    state = {
        title: '',
        abstract: '',
        date: '',
        duration: '',
        host: '',
        organiser: '',
        speaker: '',
        time: '',
        venue: '',
        attendees: []
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.createSeminar(this.state)
    }

    render() {
        return (
            <div className="container">
                <form  className="white">
                    <h5> Create Seminar </h5>
                    {/* <div className="input-field">
                        <label htmlFor="title">Title of Seminar</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div> */}

                    <TextField id="title" label="Enter Title" value={this.state.title} onChange={this.handleChange}/>
                    <TextField id="abstract" label="Enter Abstract" value={this.state.abstract} onChange={this.handleChange}/>
                    <TextField id="speaker" label="Enter Speaker" value={this.state.speaker} onChange={this.handleChange}/>
                    <TextField id="host" label="Enter Host" value={this.state.host} onChange={this.handleChange}/>
                    <TextField id="venue" label="Enter Venue" value={this.state.venue} onChange={this.handleChange}/>
                    <TextField id="date" label="Choose Date" value={this.state.date} onChange={this.handleChange}/>
                    <TextField id="time" label="Choose Time" value={this.state.time} onChange={this.handleChange}/>
                    <TextField id="duration" label="Enter Duration" value={this.state.duration} onChange={this.handleChange}/>

                    <Button onClick={this.handleSubmit}> Submit </Button>
                    
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        createSeminar: (seminar) => dispatch(createSeminar(seminar))
    }
}
export default connect(null, mapDispatchToProps)(CreateSeminarForm)