import { useMemo, useRef, useState } from 'react';
import WorkoutCard from '../components/WorkoutCard.jsx';

function Explore({ workouts, savedWorkouts, saveWorkout }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchRef = useRef(null);

  const categories = useMemo(
    () => ['All', ...new Set(workouts.map((item) => item.category))],
    [workouts]
  );

  const filteredWorkouts = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return workouts.filter((workout) => {
      const matchesSearch = workout.title.toLowerCase().includes(normalizedSearch);
      const matchesCategory = selectedCategory === 'All' || workout.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [workouts, searchText, selectedCategory]);

  const savedIds = useMemo(
    () => new Set(savedWorkouts.map((item) => item.id)),
    [savedWorkouts]
  );

  const handleFocusSearch = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <section className="page explore-page">
      <div className="page-header">
        <div>
          <h1>Workout Library</h1>
          <p>Search, filter, and save workout routines for every goal.</p>
        </div>
        <div className="filter-panel">
          <label>
            Search workouts
            <input
              ref={searchRef}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search workouts..."
            />
          </label>
          <label>
            Category
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <button className="button button-secondary" onClick={handleFocusSearch}>
            Focus Search
          </button>
        </div>
      </div>

      <div className="results-bar">
        <span>Showing {filteredWorkouts.length} results</span>
      </div>

      <div className="card-grid">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              isSaved={savedIds.has(workout.id)}
              onSave={saveWorkout}
            />
          ))
        ) : (
          <p className="empty-state">No workouts match your search or filter.</p>
        )}
      </div>
    </section>
  );
}

export default Explore;
