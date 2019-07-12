const io = require('./index.js').io
const {VERIFY_USER, NEWUSER_ARRIVED, USER_CONNECTED, USER_DISCONNECTED, LOGOUT} = require('../Events')
const {createUser, createGame} = require('../Factories')
const axios = require('axios');

 global.activeUsers = { }
let usersInRoom = { }

module.exports = function (socket){

  socket.on(VERIFY_USER, (params, callback) => {

    const nickname = params.nickname[0]
    console.log('verifying user', nickname)
    const gameRoom = params.room

    callback({isUser: false, user:createUser({name:nickname, gameRoom: gameRoom}) })
    
  })

  socket.on(USER_DISCONNECTED, params => {

    const name = params.user.user.name
    removeUser(global.activeUsers, name)
    console.log('user disconnected', name)
    })



socket.on(USER_CONNECTED, (user, room) => {
    global.activeUsers = addUser(global.activeUsers, user)
    socket.user = user
    socket.userList = global.activeUsers
    // console.log('in user connected', 'user', user, 'global.activeUsers', global.activeUsers)
    if(user){
    socket.emit('user added', global.activeUsers, room)
    }
})
}

function addUser(userList, user){
    // console.log('adding user', user.user.name)
    const key = user.user.name
    userList[key] = user
    // console.log(userList)

    return userList
    
}

function removeUser(userList, username){

    console.log('user removed', username)

    // let newList = Object.assign({}, userList)
    delete userList[username]
    return userList
}

function isUser(username, room){
    
    // console.log('in is user', username)
    if( global.activeUsers[username]){
        if(room !== global.activeUsers[username].gameRoom){
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


// axios.post('/users', global.activeUsers)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });