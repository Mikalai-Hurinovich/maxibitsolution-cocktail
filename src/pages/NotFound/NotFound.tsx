import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <div className="not-found-content">
          <h1>404</h1>
          <div className="divider"></div>
          <h2>Page Not Found</h2>
          <p>
            Oops! The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
          <Link to="/" className="home-link">
            Back to Home
          </Link>
        </div>
        <div className="not-found-image">
          <div className="cocktail-glass">
            <div className="glass-top"></div>
            <div className="glass-body">
              <div className="liquid"></div>
              <div className="straw"></div>
              <div className="ice-cube ice-cube-1"></div>
              <div className="ice-cube ice-cube-2"></div>
              <div className="bubbles">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className={`bubble bubble-${i + 1}`}></div>
                  ))}
              </div>
            </div>
            <div className="glass-foot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
