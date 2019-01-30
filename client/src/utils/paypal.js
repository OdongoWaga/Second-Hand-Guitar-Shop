import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      //   console.log(JSON.stringify(payment));
      this.props.onSuccess(payment);

      // {
      //   "paid":true,
      //   "cancelled":false,
      //   "payerID":"7SWLY99WXQZMY",
      //   "paymentID":"PAY-9VJ983235R618971VLPBDTZI",
      //   "paymentToken":"EC-1RG15444JC880884P",
      //   "returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-9VJ983235R618971VLPBDTZI&token=EC-1RG15444JC880884P&PayerID=7SWLY99WXQZMY",
      //   "address":{"recipient_name":"Игорь Горбов","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},
      //   "email":"gorbov18@gmail.com"
      // }
    };

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = err => {
      console.log(JSON.stringify(err));
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox:
        'AbQsTHoqoS9TR8HHOCGm0cyZ87LVX41RzU_RG1WJW3eblffE3DOtrcuvODkyRrmvzN1NEYCwYu_jnlzM',
      production: '',
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
          }}
        />
      </div>
    );
  }
}

export default Paypal;
