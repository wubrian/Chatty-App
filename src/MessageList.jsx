import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
    render() {
      return (
        <main className="messages">
        <Message/>
        <Notification/>
      </main>
      );
    }
  }

export default MessageList; 