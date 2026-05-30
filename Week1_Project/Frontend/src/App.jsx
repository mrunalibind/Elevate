import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext.jsx';
import workouts from './data/workouts.js';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Details from './pages/Details.jsx';
import Saved from './pages/Saved.jsx';
import About from './pages/About.jsx';
import Chatbot from './pages/Chatbot.jsx';
import NotFound from './pages/NotFound.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  const [savedWorkouts, setSavedWorkouts] = useState(() => {
    const stored = localStorage.getItem('fitlibrary-saved');
    return stored ? JSON.parse(stored) : [];
  });

  const saveWorkout = useCallback((workout) => {
    setSavedWorkouts((prevSaved) => {
      if (prevSaved.some((item) => item.id === workout.id)) {
        return prevSaved;
      }
      return [...prevSaved, workout];
    });
  }, []);

  const removeWorkout = useCallback((workoutId) => {
    setSavedWorkouts((prevSaved) => prevSaved.filter((item) => item.id !== workoutId));
  }, []);

  useEffect(() => {
    localStorage.setItem('fitlibrary-saved', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  const savedCount = useMemo(() => savedWorkouts.length, [savedWorkouts]);
  const { theme } = useContext(ThemeContext);

  // keep body in sync so global rules using `body.theme-dark` apply
  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    return () => {
      document.body.classList.remove('theme-light', 'theme-dark');
    };
  }, [theme]);

  return (
    <div className={`app-shell theme-${theme}`}>
      <NavBar savedCount={savedCount} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/workouts"
            element={<Explore workouts={workouts} savedWorkouts={savedWorkouts} saveWorkout={saveWorkout} />}
          />
          <Route
            path="/workouts/:workoutId"
            element={
              <Details
                workouts={workouts}
                savedWorkouts={savedWorkouts}
                saveWorkout={saveWorkout}
                removeWorkout={removeWorkout}
              />
            }
          />
          <Route path="/saved" element={<Saved savedWorkouts={savedWorkouts} removeWorkout={removeWorkout} />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
