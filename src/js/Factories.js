const uuidv4 = require('uuid/v4')

const createUser =({name=""} = {}) => (
 {
     id: uuidv4(), 
     name
 }
)

const createGame = ({name =  'random-word', users = []} = {}) => (
    {
        id: uuidv4(),
        name,
        users
    }
)

module.exports = {createUser, createGame}