import React from 'react'
import Games from "./Games";
import LoginForm from '../components/LoginForm'
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT, USER_DISCONNECTED, VERIFY_USER} from '../Events'
const socketURL = 'http://localhost:3001'


class Home extends React.Component{
    constructor(props){
        super(props)
        this.initSocket = this.initSocket.bind(this)
        this.setUser = this.setUser.bind(this)
        this.logout = this.logout.bind(this)
        this.state = {
            socket: null,
            user: null
          };
    }


  componentWillMount(){
    this.initSocket()
  }

  initSocket = () => {
    const socket = io(socketURL)
    socket.on('connect', ()=> {
      console.log('connected')
    //   console.log(socket)

    })
    this.setState({socket})
  }

  setUser = (user) => {
    const {socket} = this.state
    // console.log('state in home', this.state)
    socket.emit(USER_CONNECTED, user);
    this.setState({user: user})
    console.log(user)
  }

  logout = () => {
    const {socket} = this.state
    socket.emit(LOGOUT)
    this.setState({user: null})
  }

    render (){
        const {title} = this.props 
    const {socket} = this.state


    let username

    if(this.state.user){
     username = this.state.user.name + '!'
    }

   const login = () => { 
       if (this.state.user === null){
        return (
            <LoginForm socket={socket} setUser={this.setUser}/>
        )
    }else {
        return (
            <h2> Hello, {username} </h2>
        )
    }
}

    return (
        <div>
         < Games />
         <div className='container'>
            {login()}
        </div>
        </div>
        
        )
    }
}


export default Home