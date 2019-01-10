import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


export default class App extends Component {
  constructor(props){
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: {name: 'Bob'}, //name coming from the input field will be updated
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log('Connected to server');
    };
    this.socket.onmessage = ({ data }) => {
      const parsed = JSON.parse(data);
      console.log('clinet received message', parsed);
      const messages = this.state.messages.concat(parsed);
      this.setState({messages});
    };
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(newMessageString){
    //send the message to from this client to the server
    const newMessage = {username: this.state.currentUser.name, content: newMessageString};
    this.socket.send(JSON.stringify(newMessage));
  }

  changeUser(newUser){
    this.setState({currentUser: {name: newUser}});
  }

  render() {
    return (
      <div className="APP">
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar changeUser= {this.changeUser} addMessage={this.addMessage} currentUser={this.state.currentUser}/>
        <MessageList messages={this.state.messages}/>
      </div>
    );
  }
}

