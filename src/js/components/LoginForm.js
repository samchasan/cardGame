
import React from 'react';
// const io = require ('./index.js').io
import {VERIFY_USER} from '../Events'

export default class LoginForm extends React.Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.setUser = this.setUser.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            nickname:'',
            error: ''
        }
    }

    setUser = ({isUser, user}) => {
        // console.log(user, isUser)
        // console.log(this.props)
        if(isUser){
            this.setError('User name taken')
            console.log('user name taken')

        } else {
            this.props.setUser(user)
            // console.log(user)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {socket} = this.props
        const nickname = this.state.nickname
        // console.log(nickname)
        socket.emit(VERIFY_USER, nickname, this.setUser)
    }

    handleChange = (e) => {
        // console.log(e.target.value)
        this.setState({nickname: e.target.value})
        // console.log(e.target.value)
    }

    setError = (error) => {
        this.setState({error})
    }

    render(){
        const {nickname, error} = this.state
        return(
            <div className='login'>
                <form onSubmit={this.handleSubmit} className='loginForm'>
                    <label htmlFor='nickname'>
                        Got a nickname?
                    </label>
                    <input 
                        ref={(input) => {this.textInput = input}}
                        type='text'
                        id='nickname'
                        value={nickname}
                        onChange={this.handleChange}
                        placeHolder={'MyCoolUserName'}
                    />
                    
                    <div className='error' >{error ? error:null}</div>    
                    
                </form>
            </div>
        )
    }
}
