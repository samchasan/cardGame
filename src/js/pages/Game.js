import React from "react";
import Users from './Users'
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT, USER_DISCONNECTED, VERIFY_USER} from '../Events'
import { Button, Col, Row} from 'react-bootstrap';
import UserStore from "../stores/UserStore";

const randomWords = require('random-words');

const socketURL = 'http://localhost:3001'
const socket = io(socketURL)

const eventSource = new EventSource('localhost:3001/events');
eventSource.onmessage = e => {
  console.log('lietralkklasdlkjlkasd')
}


export default class Game extends React.Component {

  constructor(props){
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.createUserList = this.createUserList.bind(this)
    this.initSocket = this.initSocket.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      socket: null,
      user: null,
      gameStage: 1,
      userList: {},
      userMade: false,
      creativeDir: 'none',
      assignments: {},
      remainingCards: [],
      roomName: this.props.location.pathname.replace('/game/', '')
    }
  }

 


  componentWillMount(){
    this.initSocket()
    const userName = randomWords({exactly:1, wordsPerString: 2, maxLength: 10})
    const room = this.state.roomName
    const params = {
      'nickname': userName,
      'room': room
  }
    socket.emit(VERIFY_USER, params, this.setUser)

}
setUser = (user) => {
  const room = this.state.roomName
  console.log('new user arrived', user, room)
  socket.emit(USER_CONNECTED, user, room);
  this.setState({user: user})
}

  componentDidMount(){ 
    this.createUserList()
   
}
  

  componentDidUpdate(){

    // console.log(this.state.user.user.name)
    if (!this.state.userMade){
      const name = this.state.user.user.name
      UserStore.createUser(name)
      this.setState({userMade: true})
    }

    this.createUserList()

    const params = {
      user: this.state.user,
      room: this.state.room
    }
    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
         socket.emit(USER_DISCONNECTED, params)

    });

  }

  createUserList() {
  socket.on('user added', (users, room)=>{
    // console.log(users)
    let userList = {}  
    let keys = Object.keys(users)
    // console.log(keys)
    keys.forEach(key => {
      if (users[key].user.gameRoom === this.state.roomName){
        // console.log(users[key])

        userList[key] = users[key]

        this.setState({userList: userList})
      }
    })
  
  })
}

  initSocket = () => {
    socket.on('connect', ()=> {
      // console.log('connected', socket)
    })
    this.setState({socket})
  }


  logout = () => {
    const {socket} = this.state
    socket.emit(LOGOUT)
    this.setState({user: null})
  }


  render() {
    const {title} = this.props 
    const {socket} = this.state


    let user = this.state.user
    let username = this.state.user

    const isUser = () => {
    if(user){
    // console.log('username', username.user.name)
      username = username.user.name
      return (
        <p> Hello, {username}!</p>
      )
    }else{
      username = ''
      return (
        <p> Hello :) </p>
      )
    }
  }
    // debugger

    
    let users = this.state.userList
    let userList
    // console.log(users)

    if(users){
       const userKeys = Object.keys(users)
       userList = userKeys.map((user) => 
        <li key={user}>
          {user}
        </li>
       )}


   
    const gameRoom = this.state.roomName

    return (
      <div>
        <body>  
        <Row>
        <h1>{gameRoom}</h1>
            {isUser()}
           </Row>
            <Row>
            <Col>
            </Col>
            <Col xs lg="2" >
                <ul> {userList} </ul>
                < Users />
            </Col>
            </Row>
        </body>
      </div>
    );
  }
}
