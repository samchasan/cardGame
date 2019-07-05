import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'

// import {random, floor} from 'mathjs'
// import $ from 'jquery';
const players = [3,4,5,6,7,8,9]


class Stage1 extends React.Component {

    constructor(props) {
      super(props)
      this.setPlayerNo = this.setPlayerNo.bind(this)
      this.start = this.start.bind(this)  
      this.state = {
        players: 0,
      };
    }
  
    start () {
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

        setPlayerNo(event){
            const playerNo = event.target.id
            this.setState({players: playerNo});
            // console.log(this.state.players)
          }

        button(){
                return (
                    <Link to={{
                        pathname: './game',
                        state: {
                            playerNo: this.state.players,
                            nextStage: 2
                        }
                        }}>
                        <Button variant='outline-primary'> Advance </Button>
                </Link>      
                )
              
            }    
  

    render(){

        return (
          <div className="App">
            { this.start() }
            { this.button() }
          </div>
        );
      }

}

export default Stage1;