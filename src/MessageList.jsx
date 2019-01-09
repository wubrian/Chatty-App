import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
    render() {
      const messages = this.props.messages.map((message) => (
        <div className="message" key={message.id}>
          <div className="message-username">
          {message.username} 
          </div>
          <div className="message-content">
          {message.content}
          </div>
        </div>
      ));
      return (
        <main className="messages">
          {messages}
      </main>
      );
    }
  }

export default MessageList; 