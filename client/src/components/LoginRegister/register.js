import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import FormField from '../ui/formField';
import { update, generateData, isFormValid } from '../ui/formActions';
import { registerUser } from '../../actions/user';

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastnameinput',
          type: 'text',
          placeholder: 'Enter your lastname',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
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
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirmPassword_input',
          type: 'password',
          placeholder: 'Confirm your password',
        },
        validation: {
          required: true,
          confirm: 'password',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'register');
    let formIsValid = isFormValid(this.state.formdata, 'register');

    if (formIsValid) {
      this.props
        .registerUser(dataToSubmit)
        .then(response => {
          if (response.payload) {
            this.setState(
              {
                formError: false,
                formSuccess: true,
              },
              () => {
                this.props.history.push('/user/login');
              }
            );
          } else {
            this.setState({
              formError: true,
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
          });
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  updateForm = element => {
    const { formdata } = this.state;
    const newFormdata = update(element, formdata, 'register');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  render() {
    const { formdata, formError, formSuccess } = this.state;
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={event => this.submitForm(event)}>
                <h2>Personal information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id="name"
                      formdata={formdata.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id="lastname"
                      formdata={formdata.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>

                <div>
                  <FormField
                    id="email"
                    formdata={formdata.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Account Information</h2>

                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id="password"
                      formdata={formdata.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>

                  <div className="block">
                    <FormField
                      id="confirmPassword"
                      formdata={formdata.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>

                {formError ? (
                  <div className="error_label">Please check your data</div>
                ) : null}
                <button onClick={event => this.submitForm(event)}>
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={formSuccess}>
          <div className="dialog_alert">
            <div>Congratulation!</div>
            <div>
              You will be registered to the Login in a couple seconds...
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
  registerUser,
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Register));
