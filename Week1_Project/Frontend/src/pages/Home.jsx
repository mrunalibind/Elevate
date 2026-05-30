import { Link } from 'react-router-dom';
import workouts from '../data/workouts.js';

function HeroIllustration() {
  return (
    <svg className="hero-illustration" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="400" rx="20" fill="url(#g1)" opacity="0.08" />
      <g className="floating" transform="translate(60,30)">
        <circle cx="120" cy="120" r="40" fill="#fff" opacity="0.18" />
        <rect x="180" y="80" width="120" height="16" rx="8" fill="#fff" opacity="0.18" />
        <circle cx="320" cy="160" r="28" fill="#fff" opacity="0.18" />
      </g>
      <g transform="translate(80,60)">
        <path d="M40 240 C80 180 160 180 200 240" stroke="#fff" strokeWidth="8" fill="none" opacity="0.12" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Home() {
  return (
    <section className="page home-page">
      <div className="hero-card hero-split">
        <div className="hero-content">
          <h1 className="hero-title">Fitness Workout Library</h1>
          <p className="hero-lead">
            Discover curated workout plans, save your favourites, and track your training
            routine in one place. Generate personalized plans and download them as PDF.
          </p>
          <div className="hero-ctas">
            <Link className="button button-primary" to="/workouts">Explore Workouts</Link>
            <Link className="button button-secondary" to="/chat">Generate Plan</Link>
          </div>
          <div className="hero-features-row">
            <div className="mini-feature">🏋️ <span>Strength</span></div>
            <div className="mini-feature">🧘 <span>Yoga</span></div>
            <div className="mini-feature">🥗 <span>Nutrition</span></div>
          </div>
        </div>
        <div className="hero-media">
          <HeroIllustration />
        </div>
      </div>

      <section className="summary-grid home-summary">
        <div className="summary-card">
          <h2>{workouts.length}</h2>
          <p className="summary-sub">Workouts</p>
          <p>Browse strength, cardio, and mobility routines for all fitness levels.</p>
          <Link className="button button-secondary" to="/workouts">Browse Library</Link>
        </div>

        <div className="summary-card">
          <h2>Saved</h2>
          <p className="summary-sub">Favorites</p>
          <p>Bookmark your favourite workouts and return to your training library anytime.</p>
          <Link className="button button-secondary" to="/saved">View Saved</Link>
        </div>

        <div className="summary-card">
          <h2>Plan</h2>
          <p className="summary-sub">Builder</p>
          <p>Generate a personalized fitness & diet plan and download it as a PDF.</p>
          <Link className="button button-secondary" to="/chat">Create Plan</Link>
        </div>
      </section>

      <section className="home-features" aria-label="Home features">
        <div className="feature-card">
          <h3>Curated Programs</h3>
          <p>Programs tailored for beginners, intermediate, and advanced users.</p>
        </div>
        <div className="feature-card">
          <h3>Nutrition Guidance</h3>
          <p>Diet suggestions aligned with your goals — fat loss, muscle gain, or general health.</p>
        </div>
        <div className="feature-card">
          <h3>Progress Tracking</h3>
          <p>Save workouts and track completion to see improvements over time.</p>
        </div>
      </section>
    </section>
  );
}

export default Home;
