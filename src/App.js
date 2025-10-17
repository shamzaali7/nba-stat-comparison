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
import PlayerSelectionModal from './Components/PlayerSelectionModal';

class App extends Component{
  constructor(){
    super()
    this.state={
      playerOneName: null,
      playerTwoName: null,
      playerOneFullName: null,
      playerTwoFullName: null,
      playerOneStats: {},
      playerTwoStats: {},
      countCheckOne: 0,
      countCheckTwo: 0,
      showPlayerOneModal: false,
      showPlayerTwoModal: false,
      playerOneOptions: [],
      playerTwoOptions: []
    }

    this.handleChangeOne = this.handleChangeOne.bind(this)
    this.handleSubmitOne = this.handleSubmitOne.bind(this)
    this.handleChangeTwo = this.handleChangeTwo.bind(this)
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this)
    this.handleCountCheck = this.handleCountCheck.bind(this)
    this.selectPlayerOne = this.selectPlayerOne.bind(this)
    this.selectPlayerTwo = this.selectPlayerTwo.bind(this)
  }

  async searchPlayers(searchTerm) {
    const apiKey = process.env.REACT_APP_NBA_API_KEY;
    
    // Try to split the name intelligently
    const nameParts = searchTerm.trim().split(' ');
    let searchParams = {};
    
    if (nameParts.length >= 2) {
      // If we have at least two parts, assume first and last name
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' '); // Handle names like "Van Vleet"
      
      // First try exact match with first and last name
      try {
        const exactResponse = await axios.get(`https://api.balldontlie.io/v1/players`, {
          params: {
            first_name: firstName,
            last_name: lastName,
            per_page: 100
          },
          headers: { 
            "Authorization": apiKey
          }
        });
        
        if (exactResponse.data.data && exactResponse.data.data.length > 0) {
          // Filter for exact matches (case-insensitive)
          const exactMatches = exactResponse.data.data.filter(player => 
            player.first_name.toLowerCase() === firstName.toLowerCase() &&
            player.last_name.toLowerCase() === lastName.toLowerCase()
          );
          
          if (exactMatches.length > 0) {
            return exactMatches;
          }
        }
      } catch (error) {
        console.error("Error in exact search:", error);
      }
    }
    
    // If no exact match or single name, do a general search
    try {
      const response = await axios.get(`https://api.balldontlie.io/v1/players`, {
        params: {
          search: searchTerm,
          per_page: 100
        },
        headers: { 
          "Authorization": apiKey
        }
      });
      
      if (response.data.data && response.data.data.length > 0) {
        // Sort by how closely the full name matches
        const sorted = response.data.data.sort((a, b) => {
          const aFullName = `${a.first_name} ${a.last_name}`.toLowerCase();
          const bFullName = `${b.first_name} ${b.last_name}`.toLowerCase();
          const searchLower = searchTerm.toLowerCase();
          
          // Exact matches first
          if (aFullName === searchLower) return -1;
          if (bFullName === searchLower) return 1;
          
          // Then matches that start with the search term
          if (aFullName.startsWith(searchLower)) return -1;
          if (bFullName.startsWith(searchLower)) return 1;
          
          return 0;
        });
        
        // Return top 10 most relevant results
        return sorted.slice(0, 10);
      }
      
      return [];
    } catch (error) {
      console.error("Error in general search:", error);
      return [];
    }
  }

  async getPlayerOneId() {
    if(!this.state.playerOneName || this.state.playerOneName.trim() === '') {
      alert("Please enter a player name");
      return;
    }

    const players = await this.searchPlayers(this.state.playerOneName);
    
    if (players.length === 0) {
      alert("No players found. Please check the spelling and try again.");
    } else if (players.length === 1) {
      // Only one match, select it automatically
      this.selectPlayerOne(players[0]);
    } else {
      // Multiple matches, show selection modal
      this.setState({
        playerOneOptions: players,
        showPlayerOneModal: true
      });
    }
  }
  
  async getPlayerTwoId() {
    if(!this.state.playerTwoName || this.state.playerTwoName.trim() === '') {
      alert("Please enter a player name");
      return;
    }

    const players = await this.searchPlayers(this.state.playerTwoName);
    
    if (players.length === 0) {
      alert("No players found. Please check the spelling and try again.");
    } else if (players.length === 1) {
      // Only one match, select it automatically
      this.selectPlayerTwo(players[0]);
    } else {
      // Multiple matches, show selection modal
      this.setState({
        playerTwoOptions: players,
        showPlayerTwoModal: true
      });
    }
  }

  async selectPlayerOne(player) {
    this.setState({
      playerOneFullName: `${player.first_name} ${player.last_name}`,
      showPlayerOneModal: false
    });
    
    const apiKey = process.env.REACT_APP_NBA_API_KEY;
    await this.getPlayerOneStats(player.id, apiKey);
    this.setState({countCheckOne: 1});
  }

  async selectPlayerTwo(player) {
    this.setState({
      playerTwoFullName: `${player.first_name} ${player.last_name}`,
      showPlayerTwoModal: false
    });
    
    const apiKey = process.env.REACT_APP_NBA_API_KEY;
    await this.getPlayerTwoStats(player.id, apiKey);
    this.setState({countCheckTwo: 1});
  }

  async getPlayerOneStats(playerOneId, apiKey) {
    try {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const season = currentMonth < 9 ? currentYear - 1 : currentYear;
      
      const response = await axios.get(`https://api.balldontlie.io/v1/season_averages`, {
        params: {
          season: season,
          player_ids: [playerOneId]
        },
        headers: { 
          "Authorization": apiKey
        }
      });
      
      if (response.data.data && response.data.data.length > 0) {
        this.setState({playerOneStats: response.data.data[0]});
      } else {
        // Try previous season
        const prevResponse = await axios.get(`https://api.balldontlie.io/v1/season_averages`, {
          params: {
            season: season - 1,
            player_ids: [playerOneId]
          },
          headers: { 
            "Authorization": apiKey
          }
        });
        
        if (prevResponse.data.data && prevResponse.data.data.length > 0) {
          this.setState({playerOneStats: prevResponse.data.data[0]});
          alert(`Showing ${season - 1} season stats (latest available)`);
        } else {
          alert(`No stats available for this player`);
          this.setState({playerOneStats: {}});
        }
      }
    } catch(error) {
      console.error("Error fetching player stats:", error);
      alert("Unable to fetch player statistics");
      this.setState({playerOneStats: {}});
    }
  }
  
  async getPlayerTwoStats(playerTwoId, apiKey) {
    try {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const season = currentMonth < 9 ? currentYear - 1 : currentYear;
      
      const response = await axios.get(`https://api.balldontlie.io/v1/season_averages`, {
        params: {
          season: season,
          player_ids: [playerTwoId]
        },
        headers: { 
          "Authorization": apiKey
        }
      });
      
      if (response.data.data && response.data.data.length > 0) {
        this.setState({playerTwoStats: response.data.data[0]});
      } else {
        // Try previous season
        const prevResponse = await axios.get(`https://api.balldontlie.io/v1/season_averages`, {
          params: {
            season: season - 1,
            player_ids: [playerTwoId]
          },
          headers: { 
            "Authorization": apiKey
          }
        });
        
        if (prevResponse.data.data && prevResponse.data.data.length > 0) {
          this.setState({playerTwoStats: prevResponse.data.data[0]});
          alert(`Showing ${season - 1} season stats (latest available)`);
        } else {
          alert(`No stats available for this player`);
          this.setState({playerTwoStats: {}});
        }
      }
    } catch(error) {
      console.error("Error fetching player stats:", error);
      alert("Unable to fetch player statistics");
      this.setState({playerTwoStats: {}});
    }
  }

  handleChangeOne(e){
    this.setState({
      playerOneName: e.target.value
    })
  }

  async handleSubmitOne(e){
    e.preventDefault()
    await this.getPlayerOneId()
  }

  handleChangeTwo(e){
    this.setState({
      playerTwoName: e.target.value
    })
  }

  async handleSubmitTwo(e){
    e.preventDefault()
    await this.getPlayerTwoId()
  }

  handleCountCheck(){
    this.setState({countCheckOne: 0});
    this.setState({countCheckTwo: 0});
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
        
        {this.state.showPlayerOneModal && (
          <PlayerSelectionModal
            players={this.state.playerOneOptions}
            onSelect={this.selectPlayerOne}
            onClose={() => this.setState({showPlayerOneModal: false})}
            playerNumber={1}
          />
        )}
        
        {this.state.showPlayerTwoModal && (
          <PlayerSelectionModal
            players={this.state.playerTwoOptions}
            onSelect={this.selectPlayerTwo}
            onClose={() => this.setState({showPlayerTwoModal: false})}
            playerNumber={2}
          />
        )}
        
        <main>
          <Routes>
            <Route path="/stats" element={<Stats playerOneName={this.state.playerOneName} playerTwoName={this.state.playerTwoName} playerOneFullName={this.state.playerOneFullName} playerTwoFullName={this.state.playerTwoFullName} playerOneStats={this.state.playerOneStats} playerTwoStats={this.state.playerTwoStats} handleCountCheck={this.handleCountCheck}/>}/>
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