import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import io from 'socket.io-client'
const socketURL = 'http://localhost:3001'
const socket = io(socketURL)

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.state = {
      users:[ ],
      user: {}
    }
  }

  up(){
    window.onload( () => {

     console.log('user store updated') 

    socket.on('user added', (users, room)=>{
      console.log(users)
      let userList = {}  
      let keys = Object.keys(users)
      // console.log(keys)
      keys.forEach(key => {
        if (users[key].user.gameRoom === this.state.roomName){
          // console.log(users[key])
  
          userList[key] = users[key]
  
          this.setState({user: userList[key]})
        }
      })
    
    })
  })
  }

  createUser(name) {

    console.log('creating user', name)
    const id = Date.now();

    this.state.users.push({
      id,
      name,
      complete: false,
    });

    this.emit("change");
  }

  getAll() {
    return this.state.users;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_USER": {
        this.createUser(action.name);
        break;
      }
      case "RECEIVE_USERS": {
        this.state.users = action.users;
        this.emit("change");
        break;
      }
    }
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
