import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      NBA Stats Comparison &mdash; Built by Hamza Ali &middot; Powered by{' '}
      <a href="https://www.balldontlie.io" target="_blank" rel="noreferrer" style={{ color: 'var(--orange)' }}>
        BallDontLie API
      </a>
    </footer>
  );
}

export default Footer;
