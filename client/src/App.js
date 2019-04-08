import React, { Component } from "react";

import axios from "../node_modules/axios/dist/axios";
import firebase from "../node_modules/firebase";

const SERVER = "https://us-central1-ixia-le-lunch.cloudfunctions.net/app";

class App extends Component {
  state = {
    orders: [],
    name: "",
    order: "",
    sum: 0,
    token: null
  };

  sendNotificationOnClick = () => {
    const { token } = this.state;
    this.sendNotification(token, 'Hello', `Hello token: ${token}`, 'Example');
  }

  sendNotification = (token, title, body, tag) => {
    try {
      axios.post('https://fcm.googleapis.com/fcm/send', {
        "notification": {
          "title": title,
          "body": body,
          "click_action": "https://google.com",
          "icon": "https://png.icons8.com/search",
          actions: [
            {
              action: 'explore', title: 'Explore this new world',
              icon: 'https://png.icons8.com/search'
            },
            {
              action: 'close', title: 'Close notification',
              icon: 'https://png.icons8.com/search'
            },
          ],
          "tag": tag
        },
        "to": token
      },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'key=' /* Your key */
          }
        }
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  askForPermissioToReceiveNotifications = async () => {
    const messaging = firebase.messaging(),
      me = this;
    messaging.usePublicVapidKey("" /* Your public messaging key */);
    await messaging.requestPermission();
    const token = await messaging.getToken();
    me.setState({ token: token });
    console.log('Token:', token);

    messaging.onTokenRefresh(function () {
      messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.');
        me.setState({ token: refreshedToken });
      }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });
  }

  refreshDate = () => {
    const URL = `${SERVER}/orders`,
      me = this,
      online = window.navigator.onLine;
    if (online) {
      axios
        .get(URL)
        .then(response => {
          this.setState({ orders: response.data });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      if ('caches' in window) {
        caches.match(URL).then(function (response) {
          if (response) {
            response.json().then((json) => {
              me.setState({ orders: json });
            })
          }
        });
      }
    }
  };

  componentDidMount() {
    this.refreshDate();
    firebase.initializeApp({
      /* Your config */
    });

    this.askForPermissioToReceiveNotifications();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClick = event => {
    event.preventDefault();
    const { name, order, sum, token } = this.state;
    axios
      .post(`${SERVER}/order`, {
        name: name,
        order: order,
        sum: sum,
        token: token
      })
      .then(response => {
        this.refreshDate();
      });
  };

  render() {
    const { orders, token } = this.state;
    return (
      <div className="container">
        <h1>Hello, Ixia!</h1>
        <div className="row">
          <div className="col-md-5 col-sm-12 mb-3">
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
              className="form-control"
              onChange={this.onChange}
            />
            <button
              className="btn btn-xs btn-success mt-3"
              onClick={this.onClick}
            >
              Add
            </button>
            <button
              className="btn btn-xs btn-primary pull-right mt-3 ml-2"
              onClick={this.sendNotificationOnClick}
              disabled={token === null}
            >
              Send notif
            </button>
          </div>
          <div className="col-md-4 offset-md-2 col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Order</th>
                  <th>Sum</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, key) => (
                  <tr key={key}>
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
