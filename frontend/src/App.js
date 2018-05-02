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
  }
  componentDidMount = () => {
    setInterval(this.refreshMessages, 500);
  }
  refreshMessages = () => {
    fetch('/messages')
      .then(res => res.json())
      .then(msgs => this.setState({ messages: msgs }))
  }
  handleSubmit = event => {
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

  handleUsernameSubmit = event => {
    event.preventDefault();
    this.setState({ username: this.state.inputUsernameValue })

  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleUsernameChange = event => {
    this.setState({ inputUsernameValue: event.target.value })
  }
  askForUsername = () => {
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
