import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.addMessage = this.props.addMessage.bind(this);
    this.changeUser = this.props.changeUser.bind(this);
  }

  uhandleKeyUp = (e) => {
    if (e.key === 'Enter') {
      const newMessageString = e.target.value;
      this.changeUser(newMessageString);
    }
  }
    mhandleKeyUp = (e) => {
      if (e.key === 'Enter') {
        const newMessageString = e.target.value;
        this.addMessage(newMessageString);
      }
    }
    render() {
      return (
    <footer className="chatbar">
    <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyUp={this.uhandleKeyUp}/>
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.mhandleKeyUp} />
    </footer>
      );
    }
  }

export default ChatBar; 