import React, { Component } from "react";

import axios from "../node_modules/axios/dist/axios";

const SERVER = "https://us-central1-ixia-le-lunch.cloudfunctions.net/app";

class App extends Component {
  state = {
    orders: [],
    name: "",
    order: "",
    sum: 0
  };

  refreshDate = () => {
    axios
      .get(`${SERVER}/orders`)
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.refreshDate();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClick = event => {
    event.preventDefault();
    const { name, order, sum } = this.state;
    axios
      .post(`${SERVER}/order`, {
        name: name,
        order: order,
        sum: sum
      })
      .then(response => {
        this.refreshDate();
      });
  };

  render() {
    const { orders } = this.state;
    return (
      <div className="container">
        <h1>Hello, Ixia!</h1>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className="form-control"
              onChange={this.onChange}
            />
            <label htmlFor="order">Order</label>
            <textarea
              name="order"
              className="form-control"
              onChange={this.onChange}
            />
            <label htmlFor="sum">Sum</label>
            <input
              type="number"
              name="sum"
              class="form-control"
              onChange={this.onChange}
            />
            <button
              className="btn btn-xs btn-success pull-right mt-3"
              onClick={this.onClick}
            >
              Add
            </button>
          </div>
          <div className="col-md-6 offset-md-2 col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Order</th>
                  <th>Sum</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr>
                    <td>{order.name}</td>
                    <td>{order.order}</td>
                    <td>{order.sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
