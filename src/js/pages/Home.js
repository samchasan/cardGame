import React from 'react'
import Games from "./Games";
import * as GameActions from "../actions/GameActions";
const randomWords = require('random-words');



class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            gameRoom: null
          };
    }


  componentWillMount(){
    const roomName = randomWords({exactly:1, wordsPerString:2, separator:'-'})
    this.setState({gameRoom: roomName})
    // GameActions.createGame(roomName);
    // console.log('creating game', roomName)
  }


    render (){
    

    return (
        <div>
         {/* < Games /> */}
         <div className='container'>
         <a href={'/game/' + this.state.gameRoom}>Create a Game!</a>
        </div>
        </div>
        
        )
    }
}


export default Home