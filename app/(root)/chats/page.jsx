import ChatList from "@components/ChatList"
import Contacts from "@components/Contacts"

const Chats = () => {
  return (
    <div className="main-container ">
      <div className="flex items-center w-full justify-center">
        <ChatList />
      </div>
    </div>
  )
}

export default Chats