import React from "react";

import UserList from "../components/UserList";
import * as GameActions from "../actions/GameActions";
import UserStore from "../stores/UserStore";
const randomWords = require('random-words');

export default class Users extends React.Component {
  constructor() {
    super();
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      users: UserStore.getAll(),
    };
  }

  componentWillMount() {
    UserStore.on("change", this.getUsers);
    console.log('in users')
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.getUsers);
  }

  getUsers() {
    this.setState({
      users: UserStore.getAll(),
    }); 
  }

  createUser() {
    const roomName = randomWords({exactly:1, wordsPerString:2, separator:'-'})
    GameActions.createUser(roomName);
    console.log('creating user', roomName)
  }

  render() {
    const { users } = this.state;

    const UserComponents = users.map((user) => {
        return <UserList key={user.id} {...user}/>;
    });

    return (
      <div>
        <ul>{UserComponents}</ul> */}
      </div>
    );
  }
}
