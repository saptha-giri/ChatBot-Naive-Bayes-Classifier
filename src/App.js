import React from "react";
// import { Component } from "react";

const Message = (props)=>{
  let {text,type} = props;
  return(
    <React.Fragment>
    <li className={`message ${type} appeared`}>
      {/*<div className="avatar"></div>*/}
      <div className="text_wrapper">
         <div className="text">{text}</div>
      </div>
   </li>
   </React.Fragment>
  )
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      text :'',
      chatMessages : [{
        "message" : "Hi, How can i help you",
        "class":"left"
      }]
    }
  }

   componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  sendPost(){



    fetch('http://localhost:8080/api/chat/reply',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "userMessage":this.state.text
        })
    })
    .then(res => res.json())
    .then((result)=>{
      let obj = {};
      obj.message = result.reply;
      obj.class = "left";
      this.setState({
        chatMessages : [...this.state.chatMessages, obj],
        text:""
      });
    })
  }

  render(){
    return (
      <React.Fragment>
        <div className="chat_window">
          <div className="top_menu">
            {/*<div className="buttons">
              <div className="button close" />
              <div className="button minimize" />
              <div className="button maximize" />
            </div>*/}
            <div className="title">CHAT WITH ME</div>
          </div>
          <ul className="messages">
          {this.state.chatMessages.map((messageObj,index)=>
            <Message key={index} text={messageObj.message} type={messageObj.class} />
          )}
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
          </ul>
           
          <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
              <input
                className="message_input"
                value={this.state.text}
                onChange={(e)=>{
                  this.setState({
                    text : e.target.value
                  });
                }}
                placeholder="Type your message here..."
              />
            </div>
            <div className="send_message" onClick={()=>{
                let obj = {};
                obj.message = this.state.text;
                obj.class = "right";
                this.setState({
                  chatMessages : [...this.state.chatMessages, obj],
                  text:""
                });
                this.sendPost();

              }} >
              <div className="text">SEND</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
