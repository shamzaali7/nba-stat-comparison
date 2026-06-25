import React from 'react';
import { Link } from 'react-router-dom';
import AnkleBreaker from '../Assets/AnkleBreaker.mp4';

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <video src={AnkleBreaker} autoPlay loop muted playsInline />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <p className="home-eyebrow">2024–25 Season</p>
          <h1 className="home-title">
            NBA <span>Stat</span><br />Comparison
          </h1>
          <p className="home-subtitle">
            Search any active NBA player, pull their latest season averages,
            and compare them head-to-head with full stats.
          </p>
          <div className="home-cta-group">
            <Link to="/players" className="btn-primary">
              ⚡ Compare Players
            </Link>
            <Link to="/playerlist" className="btn-secondary">
              🏀 Browse Top Players
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Live Search</h3>
          <p>Search any NBA player by name with real-time autocomplete powered by the BallDontLie API.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Full Stats</h3>
          <p>Compare points, rebounds, assists, steals, blocks, FG%, 3P%, FT% and more, side by side.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Top Players</h3>
          <p>Browse a curated list of the league's biggest stars and click any player to start a comparison.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
