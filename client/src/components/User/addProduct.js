import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct,
} from '../../actions/products';
import UserLayout from '../../hoc/user';
import FormField from '../ui/formField';
import FileUpload from '../ui/fileUpload';

import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields,
} from '../ui/formActions';

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
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
        showLabel: true,
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter your price',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Brand',
          name: 'brand_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            {
              key: true,
              value: 'Yes',
            },
            {
              key: false,
              value: 'No',
            },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Availablse, in stock',
          name: 'availablse_input',
          options: [
            {
              key: true,
              value: 'Yes',
            },
            {
              key: false,
              value: 'No',
            },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          options: [
            {
              key: 20,
              value: 20,
            },
            {
              key: 21,
              value: 21,
            },
            {
              key: 22,
              value: 22,
            },
            {
              key: 24,
              value: 24,
            },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            {
              key: true,
              value: 'Public',
            },
            {
              key: false,
              value: 'Hidden',
            },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false,
      },
    },
  };

  componentDidMount() {
    const formData = this.state.formdata;
    const { getBrands, getWoods } = this.props;

    getBrands().then(response => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.brands,
        'brand'
      );
      this.updateField(newFormData);
    });

    getWoods().then(response => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.woods,
        'wood'
      );
      this.updateField(newFormData);
    });
  }

  updateField = newFormData => {
    this.setState(
      {
        formdata: newFormData,
      },
      () => {
        this.props.clearProduct();
      }
    );
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

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if (formIsValid) {
      this.props.addProduct(dataToSubmit).then(() => {
        if (this.props.products.addProduct.success) {
          this.resetFieldHandler();
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
    const newFormdata = update(element, formdata, 'products');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  imagesHandler = images => {
    const newFormData = {
      ...this.state.formdata,
    };
    newFormData['images'].value = images;
    newFormData['images'].valid = images;

    this.setState({
      formdata: newFormData,
    });
  };

  render() {
    const { formdata, formError, formSuccess } = this.state;

    return (
      <UserLayout>
        <h1>Add Product</h1>

        <FileUpload
          imagesHandler={images => this.imagesHandler(images)}
          reset={formSuccess}
        />

        <form onSubmit={event => this.submitForm()}>
          <FormField
            id="name"
            formdata={formdata.name}
            change={element => this.updateForm(element)}
          />
          <FormField
            id="description"
            formdata={formdata.description}
            change={element => this.updateForm(element)}
          />

          <FormField
            id="price"
            formdata={formdata.price}
            change={element => this.updateForm(element)}
          />

          <div className="form_devider" />

          <FormField
            id="brand"
            formdata={formdata.brand}
            change={element => this.updateForm(element)}
          />

          <FormField
            id="shipping"
            formdata={formdata.shipping}
            change={element => this.updateForm(element)}
          />

          <FormField
            id="available"
            formdata={formdata.available}
            change={element => this.updateForm(element)}
          />

          <div className="form_devider" />

          <FormField
            id="wood"
            formdata={formdata.wood}
            change={element => this.updateForm(element)}
          />

          <FormField
            id="frets"
            formdata={formdata.frets}
            change={element => this.updateForm(element)}
          />

          <div className="form_devider" />

          <FormField
            id="publish"
            formdata={formdata.publish}
            change={element => this.updateForm(element)}
          />

          {formSuccess ? <div className="form_success">Success...</div> : null}

          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>Add product</button>
        </form>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = {
  getWoods,
  getBrands,
  addProduct,
  clearProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
