import React from "react";
// import App from "../components/App"
import Stage1 from "../components/game/Stage1"
import Stage2 from "../components/game/Stage2"
import Stage3 from "../components/game/Stage3"
import Stage4 from "../components/game/Stage4"


export default class Game extends React.Component {

  constructor(props){
    super(props)
    // this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.state = {
      gameStage: 1,
      players: 0,
      creativeDir: 'none',
      assignments: {},
      remainingCards: [],
      roomName: this.props.location.pathname.replace('/game/', '')
    }
  }

  // componentDidUpdate(prevState){

  //   const props = this.props.location.state

  //   const playerNo = props.playerNo
  //   const nextStage = props.nextStage
  //   const CD = props.creativeDirector
  //   const assignments = props.assignments
  //   const remainingCards = props.remainingCards

  //   let newStage = prevState.gameStage

  //   console.log('state stage', this.state.gameStage, 'newStage', nextStage)

  //   if(nextStage !== this.state.gameStage){
  //     if(nextStage === 2 && this.state.gameStage === 1){
  //       console.log('advancing to stage 2')
  //       this.setState({
  //         gameStage: 2,
  //         players: playerNo,  
  //       })
  //     }
  //     if(nextStage === 3 && this.state.gameStage === 2){
  //       console.log('advancing to stage 3')
  //       this.setState({
  //         gameStage: 3,
  //         creativeDir: CD,  
  //       })
  //     }
  //     if(nextStage === 4 && this.state.gameStage === 3){
  //       console.log('advancing to stage 4')
  //       this.setState({
  //         gameStage: 4,
  //         assignments: assignments,
  //         remainingCards: remainingCards  
  //       })
  //     }
  //     // if(nextStage === 5 && this.state.gameStage === 4){
  //     //   this.setState({
  //     //     gameStage: 5,
  //     //   })
  //     // }
  //   }
  // }

  

  render() {
    console.log(this.props)

    // const updateGame = () => {
    //   if(this.state.gameStage === 1){
    //     return (
    //       <Stage1 />
    //     )
    //   } else if(this.state.gameStage === 2){
    //     return (
    //       <Stage2 players={this.state.players} />
    //     )
    //   }
    //   else if(this.state.gameStage === 3){
    //     return (
    //       <Stage3 players={this.state.players} creativeDir ={this.state.creativeDir} />
    //     )
    //   }
    //   else if(this.state.gameStage === 4){
    //     return (
    //       <Stage4 players={this.state.players} 
    //               creativeDir ={this.state.creativeDir} 
    //               assignments = {this.state.assignments}
    //               remainingCards = {this.state.remainingCards}  
    //               />
    //     )
    //   }
  
    // }

    return (
      <div>
        <h1>{this.state.roomName}</h1>

        <body>  </body>
        {/* {updateGame()} */}
      </div>
    );
  }
}
