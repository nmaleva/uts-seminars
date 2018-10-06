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
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

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

  
  
  
  //seminarId = this.props.seminarId;
  console.log(props);
  const rows = props.attendees;
  console.log(rows);
  //console.log(props.seminar.attendees);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell numeric>Name</TableCell>
            <TableCell numeric>Email</TableCell>
            <TableCell numeric>Phone</TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.name}</TableCell>
                <TableCell numeric>{row.email}</TableCell>
                <TableCell numeric>{row.phone}</TableCell>
                <TableCell numeric>More info</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}


AttendeeTable.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.seminarId;
  const seminars = state.firestore.data.seminars;
  const seminar = seminars ? seminars[id] : null
  return {
    attendees: (state.firestore.data['seminars/'+id+'/attendees']) ? state.firestore.data['seminars/'+id+'/attendees'] : []
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect( (props) => [
      { collection: 'seminars/'+ props.seminarId +'/attendees' }
  ]),
  withStyles(styles)
)(AttendeeTable)