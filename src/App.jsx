import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


export default class App extends Component {
  constructor(props){
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      numUser: 0,
      currentUser: {name: 'Bob'}, //name coming from the input field will be updated
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket.onopen = () => {
      console.log('Connected to server');
    };

    //received data from server
    this.socket.onmessage = ({ data }) => {
      const parsed = JSON.parse(data);
      console.log('clinet received message', parsed);

      console.log(parsed);

      switch(parsed.typeGeneral) {
        case 'counter':
          //handle number of users online
          this.setState({numUser: parsed.num});
          break;

        case 'incomingMessage':
          // handle incoming message
          const messages = this.state.messages.concat(parsed);
          this.setState({messages});
          break;

        case 'incomingNotification':
          // handle incoming notification by changeUser method
          const msgs = this.state.messages.concat(parsed);
          this.setState({messages: msgs});
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + parsed.typeGeneral);
      }
    };
  }

  addMessage(newMessageString){
    //send the message to from this client to the server
    const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: newMessageString};
    console.log(JSON.stringify(newMessage));
    this.socket.send(JSON.stringify(newMessage));
  }

  changeUser(newUser){
    const notify = {type: 'postNotification', newUser: newUser, username: this.state.currentUser};
    console.log(JSON.stringify(notify));
    this.socket.send(JSON.stringify(notify));
    this.setState({currentUser: {name: newUser}});
  }

  render() {
    return (
      <div className="APP">
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h3 style={{textAlign:'right'}}>{this.state.numUser}users online</h3>
        </nav>
        <ChatBar changeUser= {this.changeUser} addMessage={this.addMessage} currentUser={this.state.currentUser}/>
        <MessageList messages={this.state.messages} user= {this.state.currentUser}/>
      </div>
    );
  }
}

