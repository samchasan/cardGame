import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import {cards} from './cards.js'



class Stage4 extends React.Component {

    constructor(props) {
      super(props)
      this.game = this.game.bind(this)  
      this.state = {
        players: props.players,
        CD: props.creativeDir,
        assignments: props.assignments,
        patternCards: props.remainingCards,
        situationCard: 'none',
        situationCards: []
      };
    }


    selectCard(card) {
        const shuffledDeck = this.shuffle(cards.situation)
        const situationCard = shuffledDeck[card]
        shuffledDeck.splice(card,card+1)
        this.setState({
            situationCard: situationCard,
            situationCards: shuffledDeck
            });
        console.log(situationCard, shuffledDeck)
    
      }

      shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }  

    game(){
  
        return(
            <div>
              Stage 4
              <p> Player {this.state.CD} please pick a situation card</p>

              <p>{this.situationCard}</p>

              <Button variant="flat" size="m" onClick={this.selectCard}>
                  Card 1
              </Button>
              <Button variant="flat" size="m" onClick={this.selectCard}>
                  Card 2
              </Button>
              <Button variant="flat" size="m" onClick={this.selectCard}>
                  Card 3
              </Button>
            </div>
           )     
        }

        button(){
            return (
                <Link to={{
                    pathname: './game',
                    state: {
                       situationCard: this.state.situationCard,
                       situationCards: this.state.situationCards
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

export default Stage4;