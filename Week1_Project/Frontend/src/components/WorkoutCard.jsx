import { Link } from 'react-router-dom';
import { memo } from 'react';

function WorkoutCard({ workout, isSaved, onSave, onRemove }) {
  return (
    <article className="workout-card">
      {workout.image && (
        <img className="card-image" src={workout.image} alt={workout.title} />
      )}
      <div className="card-header">
        <h3>{workout.title}</h3>
        <div className="card-header-right">
          <span className="chip">{workout.category}</span>
          <span className="duration-badge">{workout.duration}</span>
        </div>
      </div>
      <p className="card-meta">
        <strong>Level:</strong> {workout.level} · <strong>Focus:</strong> {workout.focus}
      </p>
      <p className="card-meta">
        <strong>Equipment:</strong> {workout.equipment}
      </p>
      <div className="card-description">{workout.description}</div>
      <div className="card-actions">
        <Link className="button button-secondary" to={`/workouts/${workout.id}`}>
          View Details
        </Link>
        <div className="action-group">
          {onSave && (
            <button
              className="button"
              onClick={() => onSave(workout)}
              disabled={isSaved}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          )}
          {onRemove && (
            <button className="button button-danger" onClick={() => onRemove(workout.id)}>
              Remove
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(WorkoutCard);
