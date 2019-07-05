import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import {random, floor} from 'mathjs'



class Stage2 extends React.Component {

    constructor(props) {
      super(props)
      this.game = this.game.bind(this)  
      this.state = {
        players: props.players,
        CD: 'none'
      };
    }
  
    game(){

        const p = this.state.players
        console.log(this.state.children)

        const creativeDirector = floor(random(3,p))
        this.state.CD = creativeDirector

        return(
            <div>
            <h1> {p} players </h1>
            <h2>player {creativeDirector} is the Creative Director</h2>
            </div>
        )
         
    }

        button(){
                return (
                    <Link to={{
                        pathname: './game',
                        state: {
                            creativeDirector: this.state.CD,
                            nextStage: 3
                        }
                        }}>
                        <Button variant='outline-primary'> Advance </Button>
                </Link>      
                )
              
            }    
  

    render(){

        return (
          <div className="App">
            { this.game() }
            { this.button() }
          </div>
        );
      }

}

export default Stage2;