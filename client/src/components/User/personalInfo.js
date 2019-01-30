import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../ui/formActions';
import { updateDataUser, clearUpdateUser } from '../../actions/user';
import FormField from '../ui/formField';

class PersonalInfo extends Component {
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
          name: 'lastname_input',
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
    },
  };

  componentDidMount = () => {
    const newFormdata = populateFields(
      this.state.formdata,
      this.props.user.userData
    );

    this.setState({
      formdata: newFormdata,
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'updateUser');
    let formIsValid = isFormValid(this.state.formdata, 'updateUser');

    if (formIsValid) {
      this.props.updateDataUser(dataToSubmit).then(() => {
        if (this.props.user.updateUser.success) {
          this.setState(
            {
              formSuccess: true,
            },
            () => {
              setTimeout(() => {
                this.props.clearUpdateUser();
                this.setState({
                  formSuccess: false,
                });
              }, 2000);
            }
          );
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
    const newFormdata = update(element, formdata, 'updateUser');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  render() {
    const { formdata, formError, formSuccess } = this.state;
    return (
      <div>
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
          {formSuccess ? <div className="form_success">Success</div> : null}
          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>
            Update personal info
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  updateDataUser,
  clearUpdateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
