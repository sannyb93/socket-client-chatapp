import React ,{ useEffect, useState } from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3002')
function App() {

  const [room, setroom] = useState()
  const [message, setmessage] = useState()
  const [receivemessage, setreceivemessage] = useState()

const joinroom = () => {
  if(room !== ''){
    socket.emit("join_room", room)
  }
}

const sendMessage = () => {
  socket.emit("send_message", {message,room})
}

useEffect(()=>{
   socket.on('receive_message', (data) =>{
    setreceivemessage(data.message)
   })
},[socket])

  return (
    <div className="App">
      <div>
        <input onChange={(e) => setroom(e.target.value)} placeholder='Room' />
        <button onClick={joinroom}>Join Room</button>
      </div>
     <div>
        <input onChange={(e) => setmessage(e.target.value)} placeholder='Message' />
        <button onClick={sendMessage}>Send Message</button>
     </div>
     <h1>message:{receivemessage}</h1>
    </div>
  );
}

export default App;
