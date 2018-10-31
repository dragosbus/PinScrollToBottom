import React, { Component } from "react";
import PinScrollToBottom from "./Scroller";
import { getUser$ } from "../utils";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    getUser$.subscribe(user => {
      this.setState(prevState => ({
        users: prevState.users.concat(user)
      }));
    });
  }

  render() {
    return (
      <div className="App">
        <PinScrollToBottom>
          {this.state.users.map(user => {
            return (
              <div>
                <img src={user.picture.medium} alt={user.email} />
                <h2>
                  {user.name.first} {user.name.last}
                </h2>
              </div>
            );
          })}
        </PinScrollToBottom>
      </div>
    );
  }
}
