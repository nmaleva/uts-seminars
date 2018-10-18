import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteAttendee } from '../actions/seminarActions';

class DeleteAttendee extends Component {
    state = {
        open: false,
        id: this.props.id,
        seminarId: this.props.seminarId
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = () => {
        this.props.deleteAttendee(this.state.id, this.state.seminarId)
    }


    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>Remove</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Do you want to remove this attendee?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The attendee will no longer be able to participate in this seminar once deleted!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="secondary" autoFocus>
                            Remove
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

/**
 * Dispatches action to delete the following attendee
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        deleteAttendee: (attendeeId, seminarId) => dispatch(deleteAttendee(attendeeId, seminarId))
    }
}

export default connect(null, mapDispatchToProps)(DeleteAttendee)
