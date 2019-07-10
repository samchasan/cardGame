import React from "react";

import GameList from "../components/GameList";
import * as GameActions from "../actions/GameActions";
import GameStore from "../stores/GameStore";
const randomWords = require('random-words');

export default class Games extends React.Component {
  constructor() {
    super();
    this.getGames = this.getGames.bind(this);
    this.state = {
      games: GameStore.getAll(),
    };
  }

  componentWillMount() {
    GameStore.on("change", this.getGames);
    console.log('in games')
  }

  componentWillUnmount() {
    GameStore.removeListener("change", this.getGames);
  }

  getGames() {
    this.setState({
      games: GameStore.getAll(),
    }); 
  }

  createGame() {
    const roomName = randomWords({exactly:1, wordsPerString:2, separator:'-'})
    GameActions.createGame(roomName);
    console.log('creating game', roomName)
  }

  render() {
    const { games } = this.state;

    const GameComponents = games.map((game) => {
        return <GameList key={game.id} {...game}/>;
    });

    return (
      <div>
        <button onClick={this.createGame.bind(this)}>Create a Game!</button>
        <h1>Games</h1>
        <ul>{GameComponents}</ul>
      </div>
    );
  }
}
