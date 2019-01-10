import React, {Component} from 'react';

function checkType(type){
  console.log('asdasdasd')
  if(type === 'incomingMessage'){
    return (
      <div className="message">
      <span className="message-username">Anonymous1</span>
      <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
    )
  } else if (type === 'incomingNotification'){
    return (
          <div className="message system">
          Anonymous1 changed their name to nomnom.
          </div>
    )
  }
}

class Message extends Component {
    render() {
      return (
        <div>
          {
            checkType(this.props.message.typeGeneral)
          }
        </div>

      )
    }
  }

export default Message; 