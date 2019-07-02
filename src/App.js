import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {random, floor} from 'mathjs'
import $ from 'jquery';


// import logo from './logo.svg';
import {cards} from './cards.js'
import './App.css';
import { strict } from 'assert';
// import { isFlowDeclaration } from '@babel/types';

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

let choices = {
  playerOne: '',
  playerTwo: '',
  playerThree: '',
  playerFour: '',
  playerFive: '',
  playerSix: '',
  playerSeven: '',
  playerEight: '',
  playerNine: ''
}

let situationCard = 'none'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.setPlayerNo = this.setPlayerNo.bind(this)
    this.advanceGame = this.advanceGame.bind(this)
    this.rewindGame = this.rewindGame.bind(this)
    this.selectCard = this.selectCard.bind(this)
    this.topText = this.topText.bind(this)
    this.game = this.game.bind(this)
    this.button = this.button.bind(this)

    this.state = {
      gameStage: stages[0],
      players: 0,
      CD: 'none',
      situationCard: 'none'
    };
  }

  selectCard() {
    // const clicked = event
    console.log('in select card')
    const shuffledDeck = this.shuffle(cards.situation)
    situationCard = shuffledDeck[0]
    this.setState({situationCard: situationCard});
    console.log(situationCard, shuffledDeck)

  }

  setPlayerNo(event){
    const playerNo = event.target.id
    this.setState({players: playerNo});
    console.log(this.state.players)
  }

  advanceGame(){
    let level = this.state.gameStage
    stages.forEach((stage,i) =>{
      if(level===stage){
        this.setState({gameStage: stages[i+1]});
      }
    })
  }

  selectPatterns(event){
    // console.log(event.target.id)

    const str = event.target.id
    if (str.includes('playerOne')){
      choices.playerOne = str
      classState = 'active'
    }
    if (str.includes('playerTwo')){
      choices.playerTwo = str
      console.log(choices)
    }
    if (str.includes('playerThree')){
      choices.playerThree = str
      console.log(choices)
    }
    if (str.includes('playerFour')){
      choices.playerFour = str
      console.log(choices)
    }
    if (str.includes('playerFive')){
      choices.playerFive = str
      console.log(choices)
    }
    if (str.includes('playerSix')){
      choices.playerSix = str
      console.log(choices)
    }
    if (str.includes('playerSeven')){
      choices.playerSeven = str
      console.log(choices)
    }
    if (str.includes('playerEight')){
      choices.playerEight = str
      console.log(choices)
    }
    if (str.includes('playerNine')){
      choices.playerNine = str
      console.log(choices)
    }
  }


  rewindGame(){
    let level = this.state.gameStage
    stages.forEach((stage,i) =>{
      if(level===stage){
        this.setState({gameStage: stages[i-1]});
      }
    })
  }

  topText(){
    const s = this.state.gameStage
    if (s === stages[0]){
      return (
           <header>
             Welcome To
             <h1> SURVIVING DESIGN PROJECTS </h1>
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

  clean(obj) {
      for (var propName in obj) { 
        if (obj[propName].length < 5 ) {
          delete obj[propName];
        }
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

     ///////////////////////////////////
     ///////////// Stage 1 /////////////
     ///////////////////////////////////
     ///////////////////////////////////

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

     ///////////////////////////////////
     ///////////// Stage 2 /////////////
     ///////////////////////////////////
     ///////////////////////////////////

     if (s === stages [1]){
        console.log(p)

        const creativeDirector = floor(random(3,p))
        this.state.CD = creativeDirector

        return(
          <div>
          <h1> {p} players </h1>
          <h2>player {creativeDirector} is the Creative Director</h2>
          </div>
        )
     } 
     ///////////////////////////////////
     ///////////// Stage 3 /////////////
     ///////////////////////////////////
     ///////////////////////////////////

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

        this.clean(assignments);
    
        const hands = Object.keys(assignments).map(assignment => 
                <div className='hands' id={assignment} key={assignment}>
                <h4>{assignment}</h4>
                <ul>{assignments[assignment].map(val => 
                  <li id={val} key={val}>{val}</li>
                  )}
                </ul> 
                </div>
              )

           return(
            <div>
                Stage 3
                {hands}
             </div>
            )
        }
      
        ///////////////////////////////////
        ///////////// Stage 4 /////////////
        ///////////////////////////////////
        ///////////////////////////////////

        if (s === stages[3]){

          return(
            <div>
              Stage 4
              <p> Player {this.state.CD} please pick a situation card</p>

              <p>{situationCard}</p>

              <Button variant="flat" size="m" onClick={this.selectCard}>
                  Select
              </Button>
            </div>
           )
        }

        ///////////////////////////////////
        ///////////// Stage 5 /////////////
        ///////////////////////////////////
        ///////////////////////////////////
        
        if (s === stages[4]){
          return(
            <div>
              Stage 5
              <p>{situationCard}</p>
              <p> Player {this.state.CD} please tell a story</p>
            </div>
           )
        }

        ///////////////////////////////////
        ///////////// Stage 6 /////////////
        ///////////////////////////////////
        ///////////////////////////////////


        if (s === stages[5]){

          console.log(choices)

          const hands = Object.keys(assignments).map(assignment => 
            <div className='hands' id={assignment} key={assignment}>
            <h4>{assignment}</h4>
            <div>{assignments[assignment].map(val => 
              <Button className={activeState}
                  variant="flat" size="m" onClick={this.selectPatterns}
                  id={assignment + '_' + val} key={val}>{val}</Button>
              )}
            </div> 
            </div>
          )

          this.clean(choices);

          const picks = Object.keys(choices).map(choice =>
              <p>{choice}</p>
            )
        

          return(
            <div>
              Stage 6
              <p>{situationCard}</p>

              <p> Players other than {this.state.CD} please choose pattern cards</p>   
                {hands}  
                {picks}     
              </div>
           )
        }

          ///////////////////////////////////
          ///////////// Stage 7 /////////////
          ///////////////////////////////////
          ///////////////////////////////////


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
  