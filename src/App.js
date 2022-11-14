import './App.css';
import axios from 'axios';
import React, {Component} from 'react';

class App extends Component{
  constructor(){
    super()
    this.state={
      playerOneName: "lebron",
      playerTwoName: "jayson",
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
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerOneName}`)
    .then(res => {
      console.log(res.data.data)
    })
    .catch(error => {console.log(error)})
  }

  getPlayerOneStats(playerOneId){
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerOneId}`)
    .then(res => {
      console.log(res.data.data)
      this.setState({playerStats: res.data.data[0]})
    })
    .catch(error => {console.log(error)})
  }

  getPlayerTwoStats(playerTwoId){
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=434`)
    .then(res => {console.log(res.data.data)})
    .catch(error => {console.log(error)})
  }

  componentDidMount(){
    this.getPlayerOneId();
    this.getPlayerTwoId();
    this.getPlayerOneStats();
    this.getPlayerTwoStats();
  }

  render(){
    return (
      <div className="App">
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