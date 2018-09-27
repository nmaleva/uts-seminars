import React from 'react';
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import SmartPhone from '@material-ui/icons/Smartphone';

const RegistrationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="container">
        <h2> Register for this Seminar </h2>

        <form onSubmit={handleSubmit}>
        <div>
            <TextField
            name="name"
            label="name"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
        </div>
        <div>
            <TextField name="email" label="email" type="email" 
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}/>
        </div>
        <div>
            <TextField
            name="phone"
            label="phone"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SmartPhone />
                  </InputAdornment>
                ),
              }}
            />
        </div>
        <div>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
        </div>
        </form>
    </div>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
})(RegistrationForm);