import React, { Component } from "react";

import Order from "../../Components/UI/Order/Order";
import {orders as axios} from "../../axios";
import Loading from "../../Components/UI/Loading/Loading";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios.get("/orders.json").then(res => {
      const ordersFetched = [];
      for (let key in res.data) {
        ordersFetched.push({
          ...res.data[key],
          id: key
        });
      }
      this.setState({ loading: false, orders: ordersFetched });
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          this.state.orders.map((order) => {
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

export default withErrorHandler(Orders,axios);
