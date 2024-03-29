import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import hosts from '../data/hosts'
import venues from '../data/venues'
import { updateSeminar } from '../actions/seminarActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 180
    },
});

class SeminarUpdate extends Component {
    state = {
        title: this.props.seminar.title,
        abstract: this.props.seminar.abstract,
        date: this.props.seminar.date,
        duration: this.props.seminar.duration,
        host: this.props.seminar.host,
        speaker: this.props.seminar.speaker,
        speakerBio: this.props.seminar.speakerBio,
        time: this.props.seminar.time,
        venueIdx: this.props.seminar.venueIdx,
        organiser: this.props.seminar.organiser,
        organiserName: this.props.seminar.organiserName,
        open: false
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
        this.props.updateSeminar(this.props.seminarId, updatedSeminar)
        this.handleClose();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { title, abstract, speaker, host, venue, duration } = this.state;
        const { classes, users } = this.props;
        const isEnabled = title !== '' && abstract !== '' && speaker !== '' && host !== '' && venue !== '' && duration !== 0;

        //Items below are used to populate the selects 
        const hostItems = hosts.map((host, i) => <MenuItem key={i} value={host}> {host} </MenuItem>);
        const venueItems = Object.keys(venues).map(i => <MenuItem key={i} value={i}> {venues[i].venue} - {venues[i].capacity} cap </MenuItem>);
        const userItems = Object.keys(users).map(i => <MenuItem key={i} value={users[i].id}> {users[i].name} </MenuItem>)

        return (
            <div>
                <div style={{ display: "inline" }}>
                    <Button variant="contained" color="default" onClick={this.handleClickOpen}>Update Seminar</Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <form style={{ width: '100%' }}>
                            <h1> Update Seminar - {this.props.seminar.title} </h1>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <TextField style={{ width: 500 }} required id="title" label="Enter Title" value={this.state.title} onChange={this.handleChange} />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField id="speaker" label="Enter Speaker" style={{ width: 300 }} value={this.state.speaker} onChange={this.handleChange} />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <TextField required id="abstract" label="Enter Speaker Biography" style={{ width: 500 }} multiline value={this.state.speakerBio} onChange={this.handleChange} />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <TextField required id="abstract" label="Enter Abstract" style={{ width: 500 }} multiline value={this.state.abstract} onChange={this.handleChange} />
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
                                        <InputLabel htmlFor="organiser">Change Organiser</InputLabel>
                                        <Select name="organiser" value={this.state.organiser} onChange={this.handleSelectChange}>
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {userItems}
                                        </Select>
                                    </FormControl>


                                    <FormControl className={classes.formControl}>
                                        <TextField id="date" type="date" label="Choose Date" value={this.state.date} onChange={this.handleChange} />
                                    </FormControl>
                                </div>
                                <FormControl className={classes.formControl}>
                                    <TextField id="time" type="time" label="Choose Time" value={this.state.time} onChange={this.handleChange} />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField id="duration" type="number" label="Enter Duration in Minutes" value={this.state.duration} onChange={this.handleChange} />
                                </FormControl><br /><br />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!isEnabled} variant="contained" color="default" className={classes.button} onClick={this.handleSubmit}> Update </Button>
                        <Button disabled={!isEnabled} variant="contained" color="secondary" className={classes.button} onClick={this.handleClose}> Cancel </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

/**
 * Saves list of registered users (organisers) of system to props for use
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
    const users = (state.firestore.data.users) ? state.firestore.data.users : [];
    return {
        users: users
    }
}

/**
 * Dispatches action to update seminar
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        updateSeminar: (seminarId, seminar) => dispatch(updateSeminar(seminarId, seminar))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'users' }]),
    withStyles(styles)
)(SeminarUpdate)