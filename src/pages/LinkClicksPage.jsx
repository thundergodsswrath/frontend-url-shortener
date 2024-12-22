import React from 'react';
import { useParams } from 'react-router-dom';
import ClicksChart from '../components/ClicksChart';
import { useNavigate } from 'react-router-dom';

const LinkClicksPage = () => {
  const { short } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">🌐 URL Shortener</span>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>
      </nav>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">
            Графік кліків для посилання:&nbsp;
            <a
              href={`http://localhost:8000/${short}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-primary">
              {short}
            </a>
          </h1>
          <div className="mt-4">
            <ClicksChart short={short} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkClicksPage;
