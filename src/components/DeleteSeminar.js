import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteSeminar } from '../actions/seminarActions';

class DeleteSeminar extends Component {
    state = {
        open: false,
        id: this.props.id
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = () => {
        this.props.deleteSeminar(this.state.id)
    }


    render() {
        return (
            <div>
                <div style={{ display: 'inline' }}>
                    <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>Delete Seminar</Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Do you want to delete this seminar?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You will not be able to retrieve this seminars information once deleted!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

/**
 * Dispatches action to delete selected seminar
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        deleteSeminar: (seminarId) => dispatch(deleteSeminar(seminarId))
    }
}

export default connect(null, mapDispatchToProps)(DeleteSeminar)
