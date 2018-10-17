import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSeminar } from '../actions/seminarActions'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import firebase from 'firebase'
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import moment from 'moment'
import hosts from '../data/hosts'
import venues from '../data/venues'

const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 180
    },
});

class CreateSeminarForm extends Component {
    state = {
        title: '',
        abstract: '',
        date: moment().format('YYYY-MM-DD'),
        duration: 0,
        host: '',
        speaker: '',
        speakerBio: '',
        time: moment().format("HH:mm"),
        organiser: firebase.auth().currentUser.uid,
        venueIdx: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSelectChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let updatedSeminar = {
            title: this.state.title,
            abstract: this.state.abstract,
            date: this.state.date,
            duration: this.state.duration,
            host: this.state.host,
            speaker: this.state.speaker,
            speakerBio: this.state.speakerBio,
            time: this.state.time,
            venueIdx: this.state.venueIdx,
            venue: venues[this.state.venueIdx].venue,
            capacity: venues[this.state.venueIdx].capacity,
            organiser: this.state.organiser,
            organiserName: this.props.users[this.state.organiser].name
        }
        this.props.createSeminar(updatedSeminar)
    }

    render() {
        const {title, abstract, speaker, host, venue, duration} = this.state;
        const {classes} = this.props;
        const isEnabled = title !== '' && abstract !== '' && speaker !== '' && host !== '' && venue !== '' && duration !== 0; 
        /**
         * Items below are used to populate the selects 
         * Note: Need to add key(i) to each item in array so React can handle DOM Change of children
         */
        const hostItems = hosts.map((host, i) => <MenuItem key={i} value={host}> {host} </MenuItem>);
        const venueItems = Object.keys(venues).map(i => <MenuItem key={i} value={i}> {venues[i].venue} - {venues[i].capacity} cap </MenuItem>);

        return (
            <div>
                <form style={{width: '100%' }}>
                    <h1> Create Seminar </h1>
                    <div> <b> Organiser: </b> {firebase.auth().currentUser.displayName} </div>
                    <div>
                        <FormControl className={classes.formControl}>       
                            <TextField style={{width: 500}} required id="title" label="Enter Title" value={this.state.title} onChange={this.handleChange}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField id="speaker" label="Enter Speaker"  style={{width: 300}}  value={this.state.speaker} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <TextField required id="abstract" label="Enter Abstract" style={{width: 800}} multiline value={this.state.abstract} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <TextField required id="speakerBio" label="Enter Speaker Bio" style={{width: 800}} multiline value={this.state.speakerBio} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="host-id">Select Host</InputLabel>
                                <Select value={this.state.host} onChange={this.handleSelectChange}
                                    inputProps={{
                                        name: 'host',
                                        id: 'host-id'
                                    }}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {hostItems}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="venueIdx">Select Venue</InputLabel>
                                <Select name="venueIdx" value={this.state.venueIdx} onChange={this.handleSelectChange}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {venueItems}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField id="date" type="date" label="Choose Date" value={this.state.date} onChange={this.handleChange}/>
                            </FormControl>
                        </div>
                        <FormControl className={classes.formControl}>
                            <TextField id="time" type="time" label="Choose Time" value={this.state.time} onChange={this.handleChange}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField id="duration" type="number" label="Enter Duration in Minutes"  value={this.state.duration} onChange={this.handleChange}/>
                        </FormControl><br/><br/>
                        <FormControl className={classes.formControl}>
                            <Button disabled={!isEnabled} variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}> Submit </Button>
                        </FormControl>
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const users = (state.firestore.data.users)?state.firestore.data.users : [];
    return {
        users: users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSeminar: (seminar) => dispatch(createSeminar(seminar)),
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{ collection: 'users' }]),
    withStyles(styles)
)(CreateSeminarForm)
