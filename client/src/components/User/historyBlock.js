import React from 'react';
import moment from 'moment';

const HistoryBlock = ({ products }) => {
  const renderBlocks = products =>
    products
      ? products.map(product => (
          <tr key={product.dateOfPurchase}>
            <td>{product.porder}</td>
            <td>{moment(product.dateOfPurchase).format('MM-DD-YY')}</td>
            <td>
              {product.brand.name} {product.name}
            </td>
            <td>$ {product.price}</td>
            <td>{product.quantity}</td>
          </tr>
        ))
      : null;
  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Order number</th>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks(products)}</tbody>
      </table>
    </div>
  );
};

export default HistoryBlock;
