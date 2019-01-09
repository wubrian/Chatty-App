import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.addMessage = this.props.addMessage.bind(this);
  }

    handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        const newMessageString = e.target.value;
        const newMessage = {id: this.props.chatdetail.id, username: this.props.chatdetail.currentUser.name, content: newMessageString};
        this.addMessage(newMessage);
      }
    }
    render() {
      return (
    <footer className="chatbar">
    <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.chatdetail.currentUser.name} />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.handleKeyUp} />
    </footer>
      );
    }
  }

export default ChatBar; 