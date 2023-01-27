import './App.css';
import axios from 'axios';
import React, {Component} from 'react';
import Home from './Components/Home';
import Players from './Components/Players';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Stats from './Components/Stats';
import {Route, Routes, Link} from 'react-router-dom';
import PlayerList from './Components/PlayerList';

class App extends Component{
  constructor(){
    super()
    this.state={
      playerOneName: null,
      playerTwoName: null,
      playerOneStats: {},
      playerTwoStats: {},
      countCheckOne: 0,
      countCheckTwo: 0
    }

    this.handleChangeOne = this.handleChangeOne.bind(this)
    this.handleSubmitOne = this.handleSubmitOne.bind(this)
    this.handleChangeTwo = this.handleChangeTwo.bind(this)
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this)
    this.handleCountCheck = this.handleCountCheck.bind(this)
  }

  async getPlayerOneId(){
    const playerName = this.playerCase(this.state.playerOneName);
    await axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
    .then(async res => {
      await this.getPlayerOneStats(res.data.data[0].id);
      this.setState({countCheckOne: 1});
    })
    .catch(error => {
      alert("Unable to find player, please try again");
    })
  }

  async getPlayerTwoId(){
    const playerName = this.playerCase(this.state.playerTwoName);
    await axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
    .then(async res => {
      await this.getPlayerTwoStats(res.data.data[0].id);
      this.setState({countCheckTwo: 1});
    })
    .catch(error => {
      alert("Unable to find player, please try again");
    })
  }

  async getPlayerOneStats(playerOneId){
    await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerOneId}`)
    .then(res => {
      this.setState({playerOneStats: res.data.data[0]});
    })
    .catch(error => {console.log(error)})
  }

  async getPlayerTwoStats(playerTwoId){
    await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerTwoId}`)
    .then(res => {
      this.setState({playerTwoStats: res.data.data[0]})
    })
    .catch(error => {console.log(error)})
  }

  handleChangeOne(e){
    if(e.target.value.length > 0){
      this.setState({
        playerOneName: e.target.value
      })
    }
  }

  async handleSubmitOne(e){
    e.preventDefault()
    await this.getPlayerOneId()
  }

  handleChangeTwo(e){
    if(e.target.value.length > 0){
      this.setState({
        playerTwoName: e.target.value
      })
    }
  }

  async handleSubmitTwo(e){
    e.preventDefault()
    await this.getPlayerTwoId()
  }

  handleCountCheck(){
    this.setState({countCheckOne: 0});
    this.setState({countCheckTwo: 0});
  }

  playerCase(name){
    let p1 = [];
    for(let i=0; i<name.length; i++){
      if(i === 0){
        p1.push(name[i].toUpperCase());
      }else if(name[i] === " "){
        p1.push(name[i])
        p1.push(name[i+1].toUpperCase())
        i++;
      }else{
      p1.push(name[i].toLowerCase());
      }
    }
    const playerName = p1.join("");
    return(playerName);
  }

  render(){
    return (
      <div className="all">
        <Header/>
        <Link style={{textDecoration: "none"}} to="/">
          <span className="nav-bar one">Home </span>
        </Link>
        <Link style={{textDecoration: "none"}} to="/playerlist">
          <span className="nav-bar three">Player List</span>
        </Link>
        <Link style={{textDecoration: "none"}} to="/players">
          <span className="nav-bar two">Choose Players</span>
        </Link>
        <Footer/>
        <main>
          <Routes>
            <Route path="/stats" element={<Stats playerOneName={this.state.playerOneName} playerTwoName={this.state.playerTwoName} playerOneStats={this.state.playerOneStats} playerTwoStats={this.state.playerTwoStats} handleCountCheck={this.handleCountCheck} playerCase={this.playerCase}/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/players" element={<Players countCheckOne={this.state.countCheckOne} countCheckTwo={this.state.countCheckTwo} playerOneName={this.state.playerOneName} playerTwoName={this.state.playerTwoName} playerOneStats={this.state.playerOneStats} handleChangeOne={this.handleChangeOne} handleChangeTwo={this.handleChangeTwo} handleSubmitOne={this.handleSubmitOne} handleSubmitTwo={this.handleSubmitTwo} handleCountCheck={this.handleCountCheck}/>}/>
            <Route path="/playerlist" element={<PlayerList />}/>
          </Routes>
        </main>
      </div>
    )
  }
}

export default App;


//documentation
// https://stackoverflow.com/questions/51357334/how-would-i-round-a-number-eg-2-12-to-the-nearest-tenth-2-1-in-js
// https://medium.com/@avinash.sarguru/getting-nba-player-pictures-for-you-application-6106d5530943
// https://www.youtube.com/watch?v=LSRNmhLS76o&t=1s&ab_channel=CodeCommerce