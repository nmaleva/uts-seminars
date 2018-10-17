import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {updateAttendee} from '../actions/seminarActions'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 180
    },
});

class SeminarUpdate extends Component {
    state = {
        name: this.props.attendee.name,
        email: this.props.attendee.email,
        phone: this.props.attendee.phone,
        attendance: this.props.attendee.attendance,
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
        let updatedAttendee = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            attendance: this.state.attendance
        }
        this.props.updateAttendee(this.props.seminarId, this.props.attendeeId, updatedAttendee)
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
        const isEnabled = title !== '' && abstract !== '' && speaker !== '' && host !== '' && venue !== '' && duration !== 0; 
        /**
         * Items below are used to populate the selects 
         * Note: Need to add key(i) to each item in array so React can handle DOM Change of children
         */

        return (
            <div>
                <Button variant="contained" color="default" onClick={this.handleClickOpen}>Edit</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <form style={{width: '100%' }}>
                            <h1> Update Attendee </h1>
                            <div>
                                <FormControl className={classes.formControl}>       
                                    <TextField style={{width: 500}} required id="name" label="Enter Name" value={this.state.name} onChange={this.handleChange}/>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField id="email" label="Enter Email"  style={{width: 500}}  value={this.state.email} onChange={this.handleChange}/>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <TextField required id="phone" label="Enter Phone Number" style={{width: 500}} multiline value={this.state.phone} onChange={this.handleChange}/>
                                </FormControl>
                            </div>
                            <div>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Are you?</FormLabel>
                                <RadioGroup
                                    aria-label="Are you?"
                                    name="attendance"
                                    className={classes.group}
                                    value={this.state.attendance}
                                    onChange={this.handleSelectChange}
                                >
                                    <FormControlLabel value="interested" control={<Radio />} label="Interested" />
                                    <FormControlLabel value="attending" control={<Radio />} label="Attending" />
                                </RadioGroup>
                            </FormControl>
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateAttendee: (seminarId, attendeeId, attendee) => dispatch(updateAttendee(seminarId, attendeeId, attendee))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(SeminarUpdate))