import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSeminar } from '../actions/seminarActions'
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import moment from 'moment'
import hosts from '../data/hosts'
import venues from '../data/venues'
import { autofill } from 'redux-form';
import {updateSeminar} from '../actions/seminarActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        time: this.props.seminar.time,
        venue: this.props.seminar.venue,
        open:false
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
        console.log(this.props);
        let updatedSeminar = {
            title: this.state.title,
            abstract: this.state.abstract,
            date: this.state.date,
            duration: this.state.duration,
            host: this.state.host,
            speaker: this.state.speaker,
            time: this.state.time,
            venue: this.state.venue
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
        const {title, abstract, speaker, host, venue, duration} = this.state;
        const {classes} = this.props;
        const isEnabled = title != '' && abstract != '' && speaker != '' && host != '' && venue != '' && duration != 0; 
        /**
         * Items below are used to populate the selects 
         * Note: Need to add key(i) to each item in array so React can handle DOM Change of children
         */
        const hostItems = hosts.map((host, i) => <MenuItem key={i} value={host}> {host} </MenuItem>);
        const venueItems = venues.map((venue, i) => <MenuItem key={i} value={venue}> {venue} </MenuItem>);
        console.log(this.props)

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Update Seminar</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <form style={{width: '100%' }}>
                            <h1> Update Seminar - {this.props.seminar.title} </h1>
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
                                        <InputLabel htmlFor="venue">Select Venue</InputLabel>
                                        <Select name="venue" value={this.state.venue} onChange={this.handleSelectChange}>
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
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                    <Button disabled={!isEnabled} variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}> Update </Button>
                    <Button disabled={!isEnabled} variant="contained" color="primary" className={classes.button} onClick={this.handleClose}> Cancel </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSeminar: (seminarId, seminar) => dispatch(updateSeminar(seminarId,seminar))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(SeminarUpdate))