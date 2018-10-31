import React, { Component } from "react";

export default class PinScrollToBottom extends Component {
  constructor(props) {
    super(props);
    this.scrollBottom = this.scrollBottom.bind(this);
  }
  componentDidMount() {
    this.scrollBottom();
  }

  componentDidUpdate(prevProps, prevState, scrolledUp) {
    if (!scrolledUp) {
      this.scrollBottom();
    }
  }

  getSnapshotBeforeUpdate() {
    const { clientHeight, scrollTop, scrollHeight } = window;
    console.log(clientHeight, scrollTop, scrollHeight);
    return clientHeight + scrollTop < scrollHeight;
  }

  scrollBottom() {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }

  render() {
    return this.props.children;
  }
}
