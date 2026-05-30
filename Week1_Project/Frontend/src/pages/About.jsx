function About() {
  return (
    <section className="page about-page">
      <div className="about-card">
        <h1>About FitLibrary</h1>
        <p>
          FitLibrary is a fitness workout app designed to help users explore curated routines,
          view detailed workout plans, and save their favourite sessions for later.
        </p>
        <h2>Main Features</h2>
        <ul>
          <li>Browse workout routines by category and fitness level.</li>
          <li>Search workouts by name and filter by category.</li>
          <li>View workout details and save favourites for later.</li>
          <li>Switch between light and dark themes using Context API.</li>
          <li>Use memoization and callback hooks for optimized rendering.</li>
        </ul>
      </div>
    </section>
  );
}

export default About;
