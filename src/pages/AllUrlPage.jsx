import React, { useState, useEffect } from 'react';
import { getUserUrls } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AllUrlsPage = () => {
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserUrls = async () => {
    try {
      const data = await getUserUrls();
      setUserUrls(data);
      setLoading(false);
    } catch (err) {
      console.error('Помилка при отриманні URL користувача:', err);
      setError('Не вдалося завантажити посилання. Спробуйте пізніше.');
      setLoading(false);
    }
  };

  const formatDate = (isoDateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(isoDateString).toLocaleDateString('uk-UA', options);
  };

  useEffect(() => {
    fetchUserUrls();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

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
      <h1 className="mb-4">Всі згенеровані посилання</h1>
      {userUrls.length > 0 ? (
        <div className="list-group">
          {userUrls.map((url, index) => (
            <div key={index} className="list-group-item mb-3">
              <p>
                <strong>Згенероване посилання:</strong>{' '}
                <a
                  href={`http://localhost:8000/${url.short}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-primary">
                  {url.short}
                </a>
              </p>
              <p>
                <strong>Дата створення:</strong> {formatDate(url.created_at)}
              </p>
              <p>
                <strong>Кількість переходів:</strong> {url.redirects}
              </p>
              <button className="btn btn-primary" onClick={() => navigate(`/link/${url.short}`)}>
                Переглянути графік кліків
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">У вас ще немає скорочених посилань.</p>
      )}
    </div>
  );
};

export default AllUrlsPage;
