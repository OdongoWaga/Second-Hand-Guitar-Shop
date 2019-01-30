import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import FormField from '../ui/formField';
import { Button } from '../ui/button';
import { update, generateData, isFormValid } from '../ui/formActions';
import { loginUser } from '../../actions/user';

class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
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
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if (formIsValid) {
      this.props.loginUser(dataToSubmit).then(response => {
        if (response.payload.loginSuccess) {
          this.props.history.push('/user/dashboard');
        } else {
          this.setState({
            formError: true,
          });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  updateForm = element => {
    const { formdata } = this.state;
    const newFormdata = update(element, formdata);
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };
  render() {
    const { formdata, formError } = this.state;
    return (
      <div className="signin_wrapper">
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id="email"
            formdata={formdata.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id="password"
            formdata={formdata.password}
            change={element => this.updateForm(element)}
          />

          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button
            style={{ padding: '10px 20px' }}
            onClick={event => this.submitForm(event)}
          >
            Log in
          </button>

          <Link
            className="button"
            style={{ padding: '11px 20px', marginLeft: '10px' }}
            to="/user/reset-user"
          >
            Forgot password
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginUser,
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
