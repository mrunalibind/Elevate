import { useMemo } from 'react';
import WorkoutCard from '../components/WorkoutCard.jsx';

function Saved({ savedWorkouts, removeWorkout }) {
  const totalDuration = useMemo(
    () => savedWorkouts.reduce((sum, workout) => sum + workout.durationMinutes, 0),
    [savedWorkouts]
  );

  const savedByCategory = useMemo(() => {
    return savedWorkouts.reduce((summary, workout) => {
      summary[workout.category] = (summary[workout.category] || 0) + 1;
      return summary;
    }, {});
  }, [savedWorkouts]);

  return (
    <section className="page saved-page">
      <header className="page-header simple-header">
        <div>
          <h1>Saved Workouts</h1>
          <p>Review and remove your favourite routines.</p>
        </div>
        <div className="saved-summary">
          <p>Total saved: {savedWorkouts.length}</p>
          <p>Total duration: {totalDuration} min</p>
          {Object.keys(savedByCategory).length > 0 && (
            <p>Saved by category: {Object.entries(savedByCategory)
              .map(([key, count]) => `${key} (${count})`)
              .join(', ')}</p>
          )}
        </div>
      </header>

      {savedWorkouts.length > 0 ? (
        <div className="card-grid">
          {savedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              isSaved
              onRemove={removeWorkout}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <h2>No saved workouts yet</h2>
          <p>Save your favourite workout routines from the workouts page.</p>
        </div>
      )}
    </section>
  );
}

export default Saved;
