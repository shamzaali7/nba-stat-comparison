import './App.css';
import axios from 'axios';
import React, {Component} from 'react';
import Fighters from './Components/Fighters'
import {Route, Routes, Link} from 'react-router-dom'

class App extends Component{
  constructor(){
    super()
    this.state={
      playerOneName: null,
      playerTwoName: null,
      playerOneStats: {},
      playerTwoStats: {}
    }
  }

  getPlayerOneId(){
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerOneName}`)
    .then(res => {
      console.log(res.data.data)
      this.getPlayerOneStats(res.data.data[0].id)
    })
    .catch(error => {console.log(error)})
  }

  getPlayerTwoId(){
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerTwoName}`)
    .then(res => {
      console.log(res.data.data)
      this.getPlayerTwoStats(res.data.data[0].id)
    })
    .catch(error => {console.log(error)})
  }

  getPlayerOneStats(playerOneId){
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerOneId}`)
    .then(res => {
      console.log(res.data.data)
      this.setState({playerOneStats: res.data.data[0]})
    })
    .catch(error => {console.log(error)})
  }

  getPlayerTwoStats(playerTwoId){
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerTwoId}`)
    .then(res => {
      console.log(res.data.data)
      this.setState({playerTwoStats: res.data.data[0]})
    })
    .catch(error => {console.log(error)})
  }

  componentDidMount(){
    this.getPlayerOneId();
    this.getPlayerTwoId();
  }

  handleChangeOne(e){
    if(e.target.value.length > 0){
      this.setState({
        playerOneName: e.target.value
      })
    }
  }

  handleSubmitOne(e){
    e.preventDefault()
    this.getPlayerOneId()
    console.log(this.playerOneStats)
  }

  handleChangeTwo(e){
    if(e.target.value.length > 0){
      this.setState({
        playerTwoName: e.target.value
      })
    }
  }

  handleSubmitTwo(e){
    e.preventDefault()
    this.getPlayerTwoId()
  }

  render(){
    return (
      <div className="App">
        <Fighters handleChangeOne={this.handleChangeOne} handleChangeTwo={this.handleChangeTwo} handleSubmitOne={this.handleSubmitOne} handleSubmitTwo={this.handleSubmitTwo}/>
      </div>
    )
  }
}

export default App;



// const [playerOne, setPlayerOne] = useState({
//   playerName: null,
//   playerStats: 0
// })
// const [playerTwo, setPlayerTwo] = useState()
// const [win, setWin]= useState()
// const [picOne, setPicOne] = useState()
// const [pisTwo, setPicTwo] = useState()