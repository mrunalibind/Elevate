import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page notfound-page">
      <div className="notfound-card">
        <h1>404 Page Not Found</h1>
        <p>The workout page you are looking for does not exist.</p>
        <Link className="button button-primary" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
