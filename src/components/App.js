import React, { Component } from "react";
import PinScrollToBottom from "./Scroller";
import { getUser$, clickEvent$ } from "../utils";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.stopBtn = React.createRef();
    this.stopSubscription = this.stopSubscription.bind(this);
  }

  componentDidMount() {
    this.subscription = getUser$.subscribe(user => {
      this.setState(prevState => ({
        users: prevState.users.concat(user)
      }));
    });
  }

  stopSubscription() {
    const node = this.stopBtn.current;
    console.log(node);
    clickEvent$(node, "click").subscribe(event => {
      this.subscription.unsubscribe();
    });
  }

  render() {
    return (
      <div className="App">
        <PinScrollToBottom>
          {this.state.users.map(user => {
            return (
              <div className="user">
                <img src={user.picture.medium} alt={user.email} />
                <h2>
                  {user.name.first} {user.name.last}
                </h2>
              </div>
            );
          })}
          <button ref={this.stopBtn} onClick={this.stopSubscription}>
            Stop
          </button>
        </PinScrollToBottom>
      </div>
    );
  }
}
