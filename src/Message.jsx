import React, {Component} from 'react';

class Message extends Component {
  render() {
    let message;
    console.log(this.props.message);
    if(this.props.message.typeGeneral === 'incomingMessage'){
      message = (
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      )
    } else{
      message =  (
        <div className="message system">
          {this.props.message.username.name} changed their name to {this.props.message.newUser}.
        </div>
      )
    }
    return (
      <div>
        {message}
      </div>
    )
  }
}

export default Message; 