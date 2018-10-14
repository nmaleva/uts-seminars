import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import { addAttendee } from '../actions/seminarActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from "@material-ui/core/FormControl"
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import SmartPhone from '@material-ui/icons/Smartphone';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180
  },
});

class RegistrationForm extends Component {
  state = {
      name: '',
      email: '',
      phone: ''
  }

  handleChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.addAttendee(this.state,this.props.seminarId);
  }

  render() {
      const {name, email, phone} = this.state;
      const {classes} = this.props;
      const isEnabled = name != '' && email != '' && phone != ''; 
      
      console.log(this.props)

      return (
          <div>
              <form style={{width: '100%' }}>
                  
                  <div>
                      <FormControl className={classes.formControl}>       
                          <TextField style={{width: 500}} required id="name" label="Enter Name" value={this.state.name} onChange={this.handleChange}/>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                          <TextField id="email" label="Enter Email"  style={{width: 300}}  value={this.state.email} onChange={this.handleChange}/>
                      </FormControl>
                  </div>
                  <div>
                      <FormControl className={classes.formControl}>
                          <TextField required id="phone" label="Enter Phone Number" style={{width: 800}} multiline value={this.state.number} onChange={this.handleChange}/>
                      </FormControl>
                  </div>
                  <br/><br/>
                    <FormControl className={classes.formControl}>
                        <Button disabled={!isEnabled} variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}> Submit </Button>
                    </FormControl>
              </form>
          </div>
      )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
      addAttendee: (attendee, seminarId) => dispatch(addAttendee(attendee, seminarId))
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(RegistrationForm))