import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import firebase from 'firebase'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar(props)  {
  const { auth } = props;
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="title" color="inherit" align="left" className={classes.flex}>
            UTS Seminars
          </Typography>
          <Button color="inherit" component={Link} to="/">All Seminars</Button>
          {auth.uid && <Button color="inherit" component={Link} to="/my-seminars">My Seminars</Button>}
          {auth.uid && <Button color="inherit" component={Link} to="/create-seminar">Create Seminar</Button>}
          {!auth.uid && <Button color="inherit" component={Link} to="/login">Login</Button>}
          {auth.uid && (<Button color="inherit" component={Link} to="/" onClick={() => firebase.auth().signOut()}>Logout</Button>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default compose(connect(mapStateToProps),withStyles(styles))(Navbar)