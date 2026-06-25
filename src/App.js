import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Players from './Components/Players';
import Stats from './Components/Stats';
import PlayerList from './Components/PlayerList';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="page">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/players"    element={<Players />} />
          <Route path="/playerlist" element={<PlayerList />} />
          <Route path="/stats"      element={<Stats />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
