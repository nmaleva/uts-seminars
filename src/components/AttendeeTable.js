import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import DeleteAttendee from './DeleteAttendee';
import AttendeeUpdate from './AttendeeUpdate';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const AttendeeTable = (props) => {

  const { classes } = props;
  const id = props.seminarId;
  let rows = props.attendees;
  //Converting rows into an[] so that it can be used in .map()
  let rowsArr = Object.keys(rows).map(key => {
    rows[key].id = key;
    return rows[key];
  });

  return (   
    <div style={{'p adding Bottom' :'10%'}}>
      <div style={{float:'right'}}>Number of Attendees: {rowsArr.length}</div>
      <br/>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell >Email</TableCell>
              <TableCell numeric>Phone</TableCell>
              <TableCell> Attendance Type </TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsArr.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell >{row.email}</TableCell>
                  <TableCell numeric>{row.phone}</TableCell>
                  <TableCell>  {row.attendance} </TableCell>
                  <TableCell > <AttendeeUpdate seminarId={id} attendeeId ={row.id} attendee={row} /></TableCell>
                  <TableCell ><DeleteAttendee id={row.id} seminarId={id}/></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}


AttendeeTable.propTypes = {
  classes: PropTypes.object.isRequired
};

/**
 * Grabs Attendees for a specific seminar
 * @param {*} state 
 * @param {*} ownProps 
 */

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.seminarId;
  return {        
    attendees: (state.firestore.data['seminars/'+id+'/attendees']) ? state.firestore.data['seminars/'+id+'/attendees'] : []
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect( (props) =>  [ 
    { collection: 'seminars/'+ props.seminarId +'/attendees' }
  ]),
  withStyles(styles)
)(AttendeeTable)