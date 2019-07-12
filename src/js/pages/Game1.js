import React from "react";
import LoginForm from '../components/LoginForm'
import io from 'socket.io-client'
import {USER_CONNECTED, NEWUSER_ARRIVED, LOGOUT, USER_DISCONNECTED, VERIFY_USER} from '../Events'
import { Button, Col } from 'react-bootstrap';

const socketURL = 'http://localhost:3001'
const socket = io(socketURL)

export default class Game extends React.Component {

  constructor(props){
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.initSocket = this.initSocket.bind(this)
    this.setUser = this.setUser.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      socket: null,
      user: null,
      gameStage: 1,
      userList: {},
      creativeDir: 'none',
      assignments: {},
      remainingCards: [],
      roomName: this.props.location.pathname.replace('/game/', '')
    }
  }

  componentWillMount(){
    this.initSocket()
    // const localUser = JSON.parse(window.localStorage.user)
    // const name = localUser.name

    // console.log(name)
    // if(name){
    //   console.log(name)

    //   this.state.user = name
    // } else{
      socket.emit(NEWUSER_ARRIVED, this.state.roomName)
  // }
}

  componentDidMount(){

   

    socket.on(`users in room ${this.state.roomName}`, users => {
      this.setState({userList: users})
    })

    socket.on('user added', (users, room)=>{
    let userList = {}  
      let keys = Object.keys(users)
      keys.forEach(key => {
        if (users[key].gameRoom === this.state.roomName){
          console.log(users[key])

          userList[key] = users[key]

          this.setState({userList: userList})
        }
      })
    
    })
  }

  initSocket = () => {
    // const socket = io(socketURL)
    socket.on('connect', ()=> {
      console.log('connected', socket)
    //   console.log(socket)

    })
    this.setState({socket})
  }

  setUser = (user) => {
    // const {socket} = this.state
    const room = this.state.roomName
    window.localStorage.user = JSON.stringify(user)
    socket.emit(USER_CONNECTED, user, room);
    this.setState({user: user})
    // console.log(socket)
  }

  logout = () => {
    const {socket} = this.state
    socket.emit(LOGOUT)
    this.setState({user: null})
  }


  render() {
    const {title} = this.props 
    const {socket} = this.state


    let username

    if(this.state.user){
     username = this.state.user.name + '!'
    }


    let users = this.state.userList
    let userList
    console.log(users)

    if(users){
       const userKeys = Object.keys(users)
       userList = userKeys.map((user) => 
        <li key={user}>
          {user}
        </li>
       )}


   const login = () => { 
       if (this.state.user === null){
        return (
            <LoginForm socket={socket} setUser={this.setUser} roomName={this.state.roomName}/>
        )
    }else {
        return (
          <div>
            <Col>
            <h2> Hello, {username} </h2>
            </Col>
          
          </div>
        )
    }
}
    const gameRoom = this.state.roomName

    return (
      <div>
        <body>  

        <h1>{gameRoom}</h1>
            {login()}
            <Col xs lg="2" >
                <ul> {userList} </ul>
            </Col>

        </body>
      </div>
    );
  }
}
