import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import {cards} from './cards.js'



class Stage3 extends React.Component {

    constructor(props) {
      super(props)
      this.dealCards = this.dealCards.bind(this)  
      this.state = {
        players: props.players,
        CD: props.creativeDir,
        assignments: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
          },
          remainingCards: cards
      };
    }

    dealCards(){
  
        const shuffledDeck = this.shuffle(cards.pattern)

        for (var p = 1; p <= this.state.players; p++ ){
            for(var c = 0; c <= 2; c++ ){
                let card = shuffledDeck[c]
                this.state.assignments[p].push(card)
            }
            shuffledDeck.splice(0,3)
        }

        this.setState({cards: shuffledDeck})

        this.clean(this.state.assignments)

        console.log('cards assigned', this.state.assignments, shuffledDeck);
                      
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
          
            while (0 !== currentIndex) {
          
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
          }  

        button(){
                return (
                    <Link to={{
                        pathname: './game',
                        state: {
                            assignments: this.state.assignments,
                            remainingCards: this.state.remainingCards,
                            nextStage: 4
                        }
                        }}>
                        <Button variant='outline-primary' onClick={this.dealCards}> Deal Cards </Button>
                </Link>      
                )
              
            }    
  

    render(){

        return (
          <div className="App">
            { this.button() }
          </div>
        );
      }

}

export default Stage3;