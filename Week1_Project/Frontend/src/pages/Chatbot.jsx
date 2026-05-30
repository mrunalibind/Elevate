import { useState } from 'react';

const QUESTIONS = [
  { key: 'planType', label: 'Plan type', type: 'select', options: ['Exercise', 'Yoga', 'Diet', 'Combined'] },
  { key: 'minutes', label: 'Minutes per session', type: 'number', placeholder: 'e.g. 20' },
  { key: 'days', label: 'Days per week', type: 'number', placeholder: 'e.g. 3' },
  { key: 'weeks', label: 'Weeks to run', type: 'number', placeholder: 'e.g. 4' },
  { key: 'level', label: 'Fitness level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { key: 'goal', label: 'Primary goal', type: 'select', options: ['Fat loss', 'Muscle gain', 'Endurance', 'Flexibility', 'General health'] },
  { key: 'dietPref', label: 'Dietary preference', type: 'text', placeholder: 'e.g. vegetarian, vegan, no pork' },
  { key: 'equipment', label: 'Equipment preference', type: 'select', options: ['Bodyweight', 'Equipment', 'Mixed'] },
];

function Chatbot() {
  const [answers, setAnswers] = useState({
    planType: 'Exercise',
    minutes: 30,
    days: 3,
    weeks: 4,
    level: 'Beginner',
    goal: 'General health',
    dietPref: '',
    equipment: 'Bodyweight',
  });

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setAnswers((s) => ({ ...s, [key]: value }));
  };

  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const generatePlan = async () => {
    setError('');
    setLoading(true);

    try {
      // Just trigger the download directly
      const response = await fetch(`${apiBaseUrl}/generate-fitness-plan-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: answers.planType,
          minutesPerSession: Number(answers.minutes),
          daysPerWeek: Number(answers.days),
          weeksToRun: Number(answers.weeks),
          fitnessLevel: answers.level,
          primaryGoal: answers.goal,
          dietaryPreference: answers.dietPref,
          equipmentPreference: answers.equipment,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || response.statusText || 'Failed to generate plan');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fitness-plan-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setPlan({ success: true });
    } catch (err) {
      setError(err.message || 'Unable to generate plan.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="page chat-page">
      <div className="detail-card chat-card">
        <div className="chat-hero">
          <div>
            <h1>Fitness Plan Builder</h1>
            <p>Choose your goals and experience level to receive a tailored plan with workout, yoga, and diet guidance.</p>
          </div>
        </div>

        <div className="chat-grid">
          <div className="chat-form">
            {QUESTIONS.map((q) => (
              <label key={q.key} className="chat-field">
                <span className="label-title">{q.label}</span>
                {q.type === 'select' ? (
                  <select value={answers[q.key]} onChange={(e) => handleChange(q.key, e.target.value)}>
                    {q.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={q.type}
                    value={answers[q.key]}
                    placeholder={q.placeholder}
                    onChange={(e) => handleChange(q.key, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>

          <aside className="chat-sidebar">
            <div className="summary-card chat-summary">
              <h2>Plan preview</h2>
              <div className="summary-row"><strong>Type</strong><span>{answers.planType}</span></div>
              <div className="summary-row"><strong>Level</strong><span>{answers.level}</span></div>
              <div className="summary-row"><strong>Duration</strong><span>{answers.minutes} min</span></div>
              <div className="summary-row"><strong>Days</strong><span>{answers.days} / week</span></div>
              <div className="summary-row"><strong>Goal</strong><span>{answers.goal}</span></div>
              <div className="summary-row"><strong>Equipment</strong><span>{answers.equipment}</span></div>
              <div className="summary-row"><strong>Diet</strong><span>{answers.dietPref || 'None'}</span></div>
            </div>
          </aside>
        </div>

        <div className="button-row chat-actions">
          <button className="button button-primary" onClick={generatePlan} disabled={loading}>
            {loading ? 'Generating Plan...' : 'Generate & Download Plan'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {plan && (
          <div className="plan-output">
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h2>Plan Generated Successfully!</h2>
              <p>Your personalized fitness plan has been created and downloaded as a PDF.</p>
              <p className="success-details">
                <strong>{answers.weeks}-week {answers.level}</strong> program • 
                <strong> {answers.days} days/week</strong> • 
                <strong> {answers.minutes} min/session</strong>
              </p>
              <button className="button button-secondary" onClick={() => setPlan(null)}>Create New Plan</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Chatbot;
