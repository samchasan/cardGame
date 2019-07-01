import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {random, floor} from 'mathjs'

// import logo from './logo.svg';
import {cards} from './cards.js'
import './App.css';
import { isFlowDeclaration } from '@babel/types';

const players = [3,4,5,6,7,8,9]
const stages =['one','two','three','four','five','six','seven','eight']

let assignments = {
  playerOne: [],
  playerTwo: [],
  playerThree: [],
  playerFour: [],
  playerFive: [],
  playerSix: [],
  playerSeven: [],
  playerEight: [],
  playerNine: []
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.setPlayerNo = this.setPlayerNo.bind(this)
    this.advanceGame = this.advanceGame.bind(this)
    this.rewindGame = this.rewindGame.bind(this)
    this.topText = this.topText.bind(this)
    this.game = this.game.bind(this)
    this.button = this.button.bind(this)

    this.state = {
      gameStage: stages[0],
      players: 0,
    };
  }

  setPlayerNo(event){
    const playerNo = event.target.id
    this.setState({players: playerNo});
    console.log(this.state.players)
  }

  advanceGame(){
    let level = this.state.gameStage
    if(level===stages[7]){
      this.setState({gameStage: stages[0]});
    }
    if(level===stages[6]){
      this.setState({gameStage: stages[7]});
    }
    if(level===stages[5]){
      this.setState({gameStage: stages[6]});
    }
    if(level===stages[4]){
      this.setState({gameStage: stages[5]});
    }
    if(level===stages[3]){
      this.setState({gameStage: stages[4]});
    }
    if(level===stages[2]){
      this.setState({gameStage: stages[3]});
    }
    if(level===stages[1]){
      this.setState({gameStage: stages[2]});
    }
    if(level===stages[0]){
      this.setState({gameStage: stages[1]});
    }
  }

  rewindGame(){
    let level = this.state.gameStage
    if(level===stages[1]){
      this.setState({gameStage: stages[0]});
    }
    if(level===stages[2]){
      this.setState({gameStage: stages[1]});
    }
    if(level===stages[3]){
      this.setState({gameStage: stages[2]});
    }
    if(level===stages[4]){
      this.setState({gameStage: stages[3]});
    }
    if(level===stages[5]){
      this.setState({gameStage: stages[4]});
    }
    if(level===stages[6]){
      this.setState({gameStage: stages[5]});
    }
    if(level===stages[7]){
      this.setState({gameStage: stages[6]});
    }
    if(level===stages[8]){
      this.setState({gameStage: stages[7]});
    }
  }


  topText(){
    const s = this.state.gameStage
    if (s === stages[0]){
      return (
           <header>
             Welcome To
             <h1> SURVIVING DESIGN PRINCIPLES </h1>
           </header>
           )
        }
     }
   
  button(){
    const s = this.state.gameStage
    if (s === stages[0]){
        return (
          <Button variant="flat" size="xxl" onClick={this.advanceGame}>
            Next
          </Button>
        )
    }else{
      return (
        <div>
        <Button variant="flat" size="xxl" onClick={this.rewindGame}>
          Back
        </Button>
        <Button variant="flat" size="xxl" onClick={this.advanceGame}>
          Next
        </Button>
        </div>
      )
    }
      
    }  
  
  shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }  

  game () {
    const s = this.state.gameStage
    const p = this.state.players

    if (s === stages[0]){
      return(
        <Form>
          Select Number of Players
          <Form.Row>
          {players.map(playerNo => (
            <div id='playerNo' key={playerNo} onChange={this.setPlayerNo}>
              <Form.Check 
                inline
                type='radio'
                id={playerNo}
                name='playerRadios'
                label={playerNo}
              />
            </div>
          ))}
          </Form.Row>
        </Form>
      )}

     if (s === stages [1]){
        console.log(p)

        const creativeDirector = floor(random(3,p))

        return(
          <div>
          <h1> {p} players </h1>
          <h2>player {creativeDirector} is the Creative Director</h2>
          </div>
        )
     } 

     if (s === stages [2]){
      const numCards = floor(cards.pattern.length / p)

      console.log(numCards)

      const shuffledDeck = this.shuffle(cards.pattern)
      
      const val = numCards
      const val2 = numCards*2
      const val3 = numCards*3
      const val4 = numCards*4
      const val5 = numCards*5
      const val6 = numCards*6
      const val7 = numCards*7
      const val8 = numCards*8
      const val9 = numCards*9


      shuffledDeck.forEach((card, i) => {       
          if(i < val){
            assignments.playerOne.push(card)
          }  
          if(val <=  i && i < val2){
            assignments.playerTwo.push(card)
          }  
          if(val2 <= i && i < val3){
            assignments.playerThree.push(card)
          }  
          if(val3 <=  i && i < val4){
            assignments.playerFour.push(card)
          }  
          if(val4 <= i && i < val5){
            assignments.playerFive.push(card)
          }  
          if(val5 <= i && i < val6){
            assignments.playerSix.push(card)
          }  
          if(val6 <=  i && i < val7){
            assignments.playerSeven.push(card)
          }  
          if(val7 <= i && i < val8){
            assignments.playerEight.push(card)
          }  
          if(val8 <= i && i < val9){
            assignments.playerNine.push(card)
          }  
        })

        function clean(obj) {
          for (var propName in obj) { 
            if (obj[propName].length < 5 ) {
              delete obj[propName];
            }
          }
        }
        
        clean(assignments);

        const hands = Object.keys(assignments)
        // console.log(hands)

        Object.entries(assignments).forEach(assignment => {
          assignment.map(card => (
            console.log(card)
            // <p> {card}</p>
           ))
        })

           return(
            <div>
                Stage 3
                {Object.entries(assignments).forEach(assignment => {
                    assignment.map(card => (
                      // console.log(card)
                      <p> {card}</p>
                    ))
                  })
                }
             </div>
            )
        }
      
        // <Form.Row>
        // {players.map(playerNo => (
        //   <div id='playerNo' key={playerNo} onChange={this.setPlayerNo}>
        //     <Form.Check 
        //       inline
        //       type='radio'
        //       id={playerNo}
        //       name='playerRadios'
        //       label={playerNo}
        //     />
        //   </div>
        // ))}
        // </Form.Row>


        if (s === stages [3]){
          return(
            <div>
              Stage 4
            </div>
           )
        }
        if (s === stages [4]){
          return(
            <div>
              Stage 5
            </div>
           )
        }
        if (s === stages [5]){
          return(
            <div>
              Stage 6
            </div>
           )
        }
        if (s === stages [6]){
          return(
            <div>
              Stage 7
            </div>
           )
        }
        if (s === stages [7]){
          return(
            <div>
              Stage 8
            </div>
           )
        }


      } 
   
     



  render(){

      return (
        <div className="App">
          { this.topText() }
          { this.game() }
          { this.button() }
        </div>
      );
    }
}

export default App;
  