
const MessageBoxForBot = ({ message, isUser }) => {
  return isUser ? (
    <div className="message-box">
      <img src={ "/assets/person.jpg"} alt="profile photo" className="message-profilePhoto" />
      <div className="message-info">
       
          <p className="message-text">{message?.text}</p>
      
      </div>
    </div>
  ) : (
    <div className="message-box justify-end">
      <div className="message-info items-end">
          <p className="message-text-sender">{message?.text}</p>
      </div>
    </div>
  )
}

export default MessageBoxForBot;