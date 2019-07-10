
import dispatcher from "../dispatcher";

export function createGame(name) {
  dispatcher.dispatch({
    type: "CREATE_GAME",
    name,
  });
}

export function deleteGame(id) {
  dispatcher.dispatch({
    type: "DELETE_GAME",
    id,
  });
}

export function reloadGames() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_GAMES"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_GAMES", games: [
      {
        id: 8484848484,
        name: "Game 3",
        complete: false
      },
      {
        id: 6262627272,
        name: "Game 4",
        complete: true
      },
    ]});
  }, 1000);
}
