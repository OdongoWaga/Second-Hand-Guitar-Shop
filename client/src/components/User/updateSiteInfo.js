import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../ui/formField';
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../ui/formActions';
import { getSiteData, updateSiteData } from '../../actions/site';

class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the site working hours',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone number',
          name: 'phone_input',
          type: 'email',
          placeholder: 'Enter the site phone number',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Shop email',
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
        showLabel: true,
      },
    },
  };

  componentDidMount = () => {
    this.props.getSiteData().then(() => {
      const newFormdata = populateFields(
        this.state.formdata,
        this.props.site.siteData[0]
      );
      this.setState({
        formdata: newFormdata,
      });
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'siteInfo');
    let formIsValid = isFormValid(this.state.formdata, 'siteInfo');

    if (formIsValid) {
      this.props.updateSiteData(dataToSubmit).then(() => {
        this.setState(
          {
            formSuccess: true,
          },
          () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false,
              });
            }, 2000);
          }
        );
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  updateForm = element => {
    const { formdata } = this.state;
    const newFormdata = update(element, formdata, 'siteInfo');
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
          <h2>Site information</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id="address"
                formdata={formdata.address}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id="hours"
                formdata={formdata.hours}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>

          <div>
            <FormField
              id="phone"
              formdata={formdata.phone}
              change={element => this.updateForm(element)}
            />
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
            Update site info
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    site: state.site,
  };
};

const mapDispatchToProps = {
  getSiteData,
  updateSiteData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateSiteInfo);
