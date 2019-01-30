import React, { Component } from 'react';
import axios from 'axios';

import FormField from '../ui/formField';
import { update, generateData, isFormValid } from '../ui/formActions';

class ReserUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'resetEmail');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'resetEmail');
    let formIsValid = isFormValid(this.state.formdata, 'resetEmail');

    if (formIsValid) {
      axios.post('/api/users/reset-user', dataToSubmit).then(response => {
        if (response.data.success) {
          this.setState({
            formSuccess: true,
          });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    const { formdata, formSuccess, formError } = this.state;
    return (
      <div className="container">
        <h1>Rest passwords</h1>
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={'email'}
            formdata={formdata.email}
            change={element => this.updateForm(element)}
          />

          {formSuccess ? (
            <div className="form_success">Done, check your email</div>
          ) : null}
          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>
            Send email to reset password
          </button>
        </form>
      </div>
    );
  }
}

export default ReserUser;
