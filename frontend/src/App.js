import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      inputValue: '',
      inputUsernameValue: ''
    }
    this.refreshMessages = this.refreshMessages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
  }
  componentDidMount() {
    setInterval(this.refreshMessages, 500);
  }
  refreshMessages() {
    let cb = function (resBody) {
      let msgs = JSON.parse(resBody)
      this.setState({ messages: msgs })
    }
    cb = cb.bind(this)
    fetch('/messages')
      .then(function (res) {
        return res.text()
      })
      .then(cb)
  }
  handleSubmit(event) {
    event.preventDefault();
    let bod = JSON.stringify({
      username: this.state.username,
      contents: this.state.inputValue
    });
    fetch('/sendMsg', {
      method: 'POST',
      body: bod
    })

  }

  handleUsernameSubmit(event) {
    event.preventDefault();
    this.setState({ username: this.state.inputUsernameValue })

  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  handleUsernameChange(event) {
    this.setState({ inputUsernameValue: event.target.value })
  }
  askForUsername() {
    return (<div>
      What's your username?
      <form onSubmit={this.handleUsernameSubmit}>
        <div className="chat">
          <input
            type="text"
            value={this.state.inputUsernameValue}
            onChange={this.handleUsernameChange}>
          </input>
          <input type="submit"></input>
        </div>
      </form>
    </div>)
  }
  render() {
    if (!this.state.username) {
      return this.askForUsername();
    }
    return (
      <div>
        <div className="topcontainer">
          {this.state.messages.map(line => (<div> {line.username} : {line.contents} </div>))}
        </div>
        <div className="botcontainer">
          <form onSubmit={this.handleSubmit}>
            <div className="chat">
              <input
                type="text"
                value={this.state.inputValue}
                onChange={this.handleChange}>
              </input>
              <input type="submit"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
