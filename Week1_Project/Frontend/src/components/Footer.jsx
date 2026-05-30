import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <strong>Fit Library</strong>
          <p>Curated workouts, meal plans, and progress tracking.</p>
        </div>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/workouts">Workouts</a>
          <a href="/chat">Plan Builder</a>
        </div>
        <div className="footer-right">
          <small>© {new Date().getFullYear()} Fit Library. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
