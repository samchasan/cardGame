import React from "react";
// import activeUsers from '../server/SocketManager'

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

  componentWillMount(){
  //  console.log(this.props)

  }

  render() {
    console.log(this.props)

    const name = this.state.roomName

    return (
      <div>
        <h1>{name}</h1>

              />
        <body>  


        </body>
      </div>
    );
  }
}
