import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
    render() {
      // const messages = this.props.messages.map((message, id) => (
      //   <div className="message" key={id}>
      //     <div className="message-username">
      //     {message.username} 
      //     </div>
      //     <div className="message-content">
      //     {message.content}
      //     </div>
      //   </div>
      // ));
      return (
        <div>
          {
            this.props.messages.map((message)=> <Message message={message}/>)
          }
        </div>
      )
    }
  }

export default MessageList; 