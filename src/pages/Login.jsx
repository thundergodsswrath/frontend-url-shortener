import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setUsernameError(false);
    setPasswordError(false);

    if (!username || !password) {
      if (!username) setUsernameError(true);
      if (!password) setPasswordError(true);
      return;
    }

    loginUser(username, password, setError, navigate);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Авторизація</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Логін
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                    placeholder="Введіть логін"
                  />
                  {usernameError && (
                    <div className="invalid-feedback">Поле Логін не може бути порожнім</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Пароль
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    placeholder="Введіть пароль"
                  />
                  {passwordError && (
                    <div className="invalid-feedback">Поле Пароль не може бути порожнім</div>
                  )}
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                  Увійти
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                Немає акаунту?{' '}
                <Link to="/register" className="text-primary">
                  Зареєструватися
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
