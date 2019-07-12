const io = require('./index.js').io
const {VERIFY_USER, NEWUSER_ARRIVED, USER_CONNECTED, LOGOUT} = require('../Events')
const {createUser, createGame} = require('../Factories')
const axios = require('axios');

let activeUsers = { }
let usersInRoom = {}

module.exports = function (socket){

  socket.on(NEWUSER_ARRIVED, room =>{
      const userKeys = Object.keys(activeUsers)
      userKeys.forEach(key => {
         if( room == activeUsers[key].gameRoom){
            usersInRoom[key] = activeUsers[key]
         }
      })
      socket.emit(`users in room ${room}`, usersInRoom)

  })  

  socket.on(VERIFY_USER, (params, callback) => {

    const nickname = params.nickname
    const gameRoom = params.room
    const nameIsTaken = isUser(nickname, gameRoom)
    
    if(nameIsTaken){
        callback({isUser: true, user:null})
    } else {
        callback({isUser: false, user:createUser({name:nickname, gameRoom: gameRoom}) })
    }
  })

socket.on(USER_CONNECTED, (user, room) => {
    activeUsers = addUser(activeUsers, user)
    socket.user = user
    socket.userList = activeUsers
    if(user){
    socket.emit('user added', activeUsers, room)
    }
})
}

function addUser(userList, user){
    const key = user.name
    userList[key] = user

    return userList
}

function removeUser(userList, username){
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

function isUser(username, room){
    
    console.log('in is user', activeUsers[username])
    if( activeUsers[username]){
        if(room !== activeUsers[username].gameRoom){
            // console.log('in a different room' )
            return false
        }else {
            // console.log('same room')
            return true
        }
    } else {
        return false
    }
}


// axios.post('/users', activeUsers)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });