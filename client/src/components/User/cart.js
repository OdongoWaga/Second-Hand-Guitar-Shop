import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwersomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user';

import UserLayout from '../../hoc/user';
import ProductBlock from '../ui/productBlock';
import PayPal from '../../utils/paypal';

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showSuccess: false,
    showTotal: false,
  };

  componentDidMount() {
    let cartItems = [];
    let { user } = this.props;

    if (user.userData && user.userData.cart.length) {
      user.userData.cart.forEach(item => {
        cartItems.push(item.id);
      });

      this.props.getCartItems(cartItems, user.userData.cart).then(() => {
        if (this.props.user.cartDetail) {
          this.calculateTotal(this.props.user.cartDetail);
        }
      });
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    this.setState({
      total,
      showTotal: true,
    });
  };

  removeFromCart = id => {
    this.props.removeCartItem(id).then(() => {
      if (!this.props.user.cartDetail.length) {
        this.setState({
          showTotal: false,
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  showNotItemsMessage = () => {
    return (
      <div className="cart_no_items">
        <FontAwersomeIcon icon={faFrown} />
        <div>You have not items</div>
      </div>
    );
  };

  showSuccessMessage = () => {
    return (
      <div className="cart_success">
        <FontAwersomeIcon icon={faSmile} />
        <div>Thank you !</div>
        <p>Your order is now complete</p>
      </div>
    );
  };

  transactionError = data => {
    console.log('PayPal error');
  };

  transactionCansel = data => {
    console.log('Transaction canseled');
  };

  transactionSuccess = data => {
    this.props
      .onSuccessBuy({
        cartDetail: this.props.user.cartDetail,
        paymentData: data,
      })
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true,
          });
        }
      });
  };

  render() {
    const { user } = this.props;
    return (
      <UserLayout>
        <h1>My cart</h1>
        <div className="user_cart">
          <ProductBlock
            products={user}
            type="cart"
            removeItem={id => this.removeFromCart(id)}
          />
          {!this.state.showTotal && !this.state.showSuccess
            ? this.showNotItemsMessage()
            : null}

          {this.state.showSuccess ? this.showSuccessMessage() : null}

          {this.state.showTotal ? (
            <div className="paypal_button_container">
              <PayPal
                toPay={this.state.total}
                transactionError={data => this.transactionError(data)}
                transactionCansel={data => this.transactionCansel(data)}
                onSuccess={data => this.transactionSuccess(data)}
              />
            </div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapDispatchToProps = {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
};

export default connect(
  null,
  mapDispatchToProps
)(Cart);
