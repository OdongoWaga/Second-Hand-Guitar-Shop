import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBrands, addBrand } from '../../actions/products';
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from '../ui/formActions';
import FormField from '../ui/formField';

class ManageBrands extends Component {
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
          placeholder: 'Enter your brand',
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

  componentDidMount = () => {
    this.props.getBrands();
  };

  showCategoryItems = () => {
    return this.props.products.brands
      ? this.props.products.brands.map(item => {
          return (
            <div className="category_item" key={item._id}>
              {item.name}
            </div>
          );
        })
      : null;
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata);
    this.setState({
      formSuccess: true,
      dataForm: newFormData,
    });

    setTimeout(() => {
      this.setState({
        formSuccess: false,
      });
    }, 3000);
  };

  updateForm = element => {
    const { formdata } = this.state;
    const newFormdata = update(element, formdata, 'brands');
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = event => {
    event.preventDefault();

    const existingBrands = this.props.products.brands;
    let dataToSubmit = generateData(this.state.formdata, 'brands');
    let formIsValid = isFormValid(this.state.formdata, 'brands');

    if (formIsValid) {
      this.props.addBrand(dataToSubmit, existingBrands).then(response => {
        if (response.payload.success) {
          this.resetFieldHandler();
        } else {
          this.this.setState({
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

  render() {
    const { formdata, formError } = this.state;
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>

        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.onSubmit(event)}>
              <FormField
                id="name"
                formdata={formdata.name}
                change={element => this.updateForm(element)}
              />

              {formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add brand
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  getBrands,
  addBrand,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBrands);
