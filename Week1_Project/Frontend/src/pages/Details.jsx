import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Details({ workouts, savedWorkouts, saveWorkout, removeWorkout }) {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const workout = useMemo(
    () => workouts.find((item) => item.id === workoutId),
    [workouts, workoutId]
  );

  const isSaved = useMemo(
    () => savedWorkouts.some((item) => item.id === workoutId),
    [savedWorkouts, workoutId]
  );

  if (!workout) {
    return (
      <section className="page detail-page">
        <h1>Workout not found</h1>
        <p>The workout you are looking for does not exist.</p>
        <button className="button" onClick={() => navigate('/workouts')}>
          Back to workouts
        </button>
      </section>
    );
  }

  return (
    <section className="page detail-page">
      <div className="detail-card">
        {workout.image && <img src={workout.image} alt={workout.title} className="detail-image" />}
        <h1>{workout.title}</h1>
        <div className="detail-meta">
          <span className="chip">{workout.category}</span>
          <span>{workout.level}</span>
          <span>{workout.duration}</span>
          <span>{workout.focus}</span>
        </div>
        <p>{workout.description}</p>
        <div className="button-row">
          {!isSaved ? (
            <button className="button" onClick={() => saveWorkout(workout)}>
              Save Workout
            </button>
          ) : (
            <button className="button button-secondary" onClick={() => removeWorkout(workout.id)}>
              Remove from Saved
            </button>
          )}
          <button className="button button-secondary" onClick={() => navigate('/workouts')}>
            Back to workouts
          </button>
        </div>
      </div>
    </section>
  );
}

export default Details;
