import './App.css';
import axios from 'axios';
import React, {Component} from 'react';
import Home from './Components/Home';
import Fighters from './Components/Fighters';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Stats from './Components/Stats';
import {Route, Routes, Link} from 'react-router-dom';

class App extends Component{
  constructor(){
    super()
    this.state={
      playerOneName: null,
      playerTwoName: null,
      playerOneStats: {},
      playerTwoStats: {}
    }

    this.handleChangeOne = this.handleChangeOne.bind(this)
    this.handleSubmitOne = this.handleSubmitOne.bind(this)
    this.handleChangeTwo = this.handleChangeTwo.bind(this)
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this)
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
      <div className="all">
        <Header/>
        <Link style={{textDecoration: "none"}} to="/">
          <span className="nav-bar one">Home </span>
        </Link>
        <Link style={{textDecoration: "none"}} to="/fighters">
          <span className="nav-bar two">Choose Players</span>
        </Link>
        <Footer/>
        <main>
          <Routes>
            <Route path="/stats" element={<Stats playerOneStats={this.state.playerOneStats} playerTwoStats={this.state.playerTwoStats}/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/fighters" element={<Fighters playerOneStats={this.state.playerOneStats} handleChangeOne={this.handleChangeOne} handleChangeTwo={this.handleChangeTwo} handleSubmitOne={this.handleSubmitOne} handleSubmitTwo={this.handleSubmitTwo}/>}/>
          </Routes>
        </main>
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



//documentation
// https://stackoverflow.com/questions/51357334/how-would-i-round-a-number-eg-2-12-to-the-nearest-tenth-2-1-in-js