const io = require('./index.js').io
const {VERIFY_USER, USER_CONNECTED, LOGOUT} = require('../Events')
const {createUser, createGame} = require('../Factories')

let activeUsers = { }

module.exports = function (socket){
  socket.on(VERIFY_USER, (nickname, callback) => {
      console.log('verifying user', nickname)

    const nameIsTaken = isUser(nickname)
    
    console.log(nameIsTaken)

    if(nameIsTaken){
        callback({isUser: true, user:null})
    } else {
        callback({isUser: false, user:createUser({name:nickname})})
    }
  })

socket.on(USER_CONNECTED, (user) => {
    console.log(user)
    activeUsers = addUser(activeUsers, user)
    socket.user = user
})
}

function addUser(userList, user){
    const key = user.name
    userList[key] = user
    console.log('in newList', activeUsers)
    // newList[user.name = user]
    return userList
}

function removeUser(userList, username){
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

function isUser(username){
    return activeUsers[username]
}



// axios.post('/users', activeUsers)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });