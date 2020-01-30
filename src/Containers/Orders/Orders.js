import React, { Component } from "react";
import { connect } from 'react-redux';

import Order from "../../Components/UI/Order/Order";
import {orders as axios} from "../../axios";
import Loading from "../../Components/UI/Loading/Loading";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { getAllOrders } from '../../store/actions'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    return (
      <div>
        {this.props.loading ? (
          <Loading />
        ) : (
          this.props.orders.map((order) => {
            return (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                totalPrice={+order.price}
              />
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loadingOrders,
    orders: state.order.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(getAllOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios));
