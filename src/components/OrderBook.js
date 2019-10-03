import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeConnection } from '../store/socket';
import {
  selectOrderBook,
  selectIsLoading,
  selectOrderBookScale
} from '../store/orderBook';

import './orderBook.css';

const OrderBook = ({ makeConnection, orderBook, loading, scale }) => {
  useEffect(() => makeConnection(), []);

  const bidBook = orderBook.slice(0, 25);
  const askBook = orderBook.slice(25);

  const renderCount = element => !loading && element[1];
  const renderAmount = element => !loading && Math.abs(Math.round(element[2]));
  const renderTotal = (array, index) => {
    const getTotal = () =>
    array
        .slice(0, index + 1)
        .reduce((acc, value) => acc + Math.abs(value[2]), 0);
    return !loading ? Math.abs(Math.round(getTotal())) : null;
  };
  const renderPrice = element => !loading && element[0];

  return (
    <div className="orderBookWrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Count</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bidBook.map((element, index, array) => {
            const total = renderTotal(array, index);
            const scaledTotal = total * scale;
            const getProgressStyle = () =>
              `linear-gradient(to left,green ${scaledTotal}%, #282c34 ${scaledTotal}%)`;
            return (
              <tr
                style={{
                  backgroundImage: getProgressStyle()
                }}
              >
                <td>{renderCount(element)}</td>
                <td>{renderAmount(element)}</td>
                <td>{total}</td>
                <td>{renderPrice(element)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Total</th>
            <th>Amount</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {askBook.map((element, index, array) => {
            const total = renderTotal(array, index);
            const scaledTotal = total * scale;
            const getProgressStyle = () =>
              `linear-gradient(to right,red ${scaledTotal}%, #282c34 ${scaledTotal}%)`;
            return (
              <tr
                style={{
                  backgroundImage: getProgressStyle()
                }}
              >
                <td>{renderPrice(element)}</td>
                <td>{total}</td>
                <td>{renderAmount(element)}</td>
                <td>{renderCount(element)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  state => ({
    orderBook: selectOrderBook(state),
    loading: selectIsLoading(state),
    scale: selectOrderBookScale(state)
  }),
  { makeConnection }
)(OrderBook);
