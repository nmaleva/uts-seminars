import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

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

  const { classes } = props;

  let loginBtn;
  if (props.isLoggedIn) {
    loginBtn = <Button color="inherit" onClick={ () => firebase.auth().signOut() }>Logout</Button>;
    console.log(props.isLoggedIn)
  } else {
    loginBtn = <Button color="inherit" component={Link} to="/login">Login</Button>;
    //console.log('nav -- logged out');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="title" color="inherit" align="left" className={classes.flex}>
            UTS Seminars
          </Typography>
          <Button color="inherit" component={Link} to="/">All Seminars</Button>
          {props.isLoggedIn && (<Button color="inherit" component={Link} to="/">My Seminars</Button>) }
          {props.isLoggedIn && (<Button color="inherit" component={Link} to="/create-seminar">Create Seminar</Button>) }
          {loginBtn}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);