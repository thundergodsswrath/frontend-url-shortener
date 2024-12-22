import React, { useState, useEffect } from 'react';
import { shortenUrl, getUserUrls, getUserName } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ShortenURL = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [userUrls, setUserUrls] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Будь ласка, введіть URL');
      return;
    }

    setError('');
    setShortenedUrl('');

    try {
      const data = await shortenUrl(url);
      setShortenedUrl(data.short);
      fetchUserUrls();
    } catch (err) {
      console.error('Детальна помилка:', err);
      setError(err.response?.data?.message || err.message || 'Щось пішло не так');
    }
  };

  const fetchUserUrls = async () => {
    try {
      const data = await getUserUrls();
      console.log('Отримані URL:', data);
      setUserUrls(data);
    } catch (err) {
      console.error('Помилка при отриманні URL користувача:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const full_user = await getUserName();
        const user = await getUserName();
        setUserName(full_user.full_name);
        setUser(user.username);
      } catch (error) {
        console.error("Не вдалося отримати ім'я користувача:", error);
      }
    };

    fetchUserName();
    fetchUserUrls();
  }, []);

  const handleViewAll = () => {
    navigate('/all-urls');
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-light justify-content-between">
        <span className="navbar-brand mb-0 h1">🌐 URL Shortener</span>
        <div className="d-flex">
          <span className="navbar-text me-3">{userName ? `${userName}` : ` ${user}`}</span>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Вийти
          </button>
        </div>
      </nav>

      <div className="mt-5">
        <h1 className="text-center">
          Згенеруйте своє коротке <span className="text-primary">посилання</span> 🌐
        </h1>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Введіть URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            <button type="submit" className="btn btn-primary">
              Згенерувати
            </button>
          </div>
          {error && <div className="text-danger">{error}</div>}
        </form>

        {shortenedUrl && (
          <div className="alert alert-success mt-3">
            Ваше коротке посилання:{' '}
            <a
              href={`http://localhost:8000/${shortenedUrl}`}
              target="_blank"
              rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}

        <div className="mt-5">
          <h2>Ваші згенеровані посилання:</h2>
          {userUrls.length > 0 ? (
            <ul className="list-group">
              {userUrls.slice(0, 3).map((url, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    <strong>Згенероване посилання:</strong>{' '}
                    <a
                      href={`http://localhost:8000/${url.short}`}
                      target="_blank"
                      rel="noopener noreferrer">
                      {url.short}
                    </a>
                  </p>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => navigate(`/link/${url.short}`)}>
                    Статистика
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">У вас ще немає скорочених посилань</p>
          )}
          {userUrls.length >= 0 && (
            <button className="btn btn-secondary mt-3" onClick={handleViewAll}>
              Показати всі...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortenURL;
