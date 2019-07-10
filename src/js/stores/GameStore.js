import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class GameStore extends EventEmitter {
  constructor() {
    super()
    this.games = [
      {
        id: 113464613,
        name: "Game 1",
        complete: false
      },
      {
        id: 235684679,
        name: "Game 2",
        complete: false
      },
    ];
  }

  createGame(name) {
    const id = Date.now();

    this.games.push({
      id,
      name,
      complete: false,
    });

    this.emit("change");
  }

  getAll() {
    return this.games;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_GAME": {
        this.createGame(action.name);
        break;
      }
      case "RECEIVE_GAMES": {
        this.games = action.games;
        this.emit("change");
        break;
      }
    }
  }

}

const gameStore = new GameStore;
dispatcher.register(gameStore.handleActions.bind(gameStore));

export default gameStore;
