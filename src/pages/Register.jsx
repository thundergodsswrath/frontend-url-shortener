import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleRegister } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setUsernameError(false);
    setPasswordError(false);
    setFullNameError(false);

    if (!username || !password || !fullName) {
      if (!username) setUsernameError(true);
      if (!password) setPasswordError(true);
      if (!fullName) setFullNameError(true);
      return;
    }

    if (password.length < 8) {
      setPasswordError(true);
      setError('Пароль має бути не менше 8 символів');
      return;
    }

    handleRegister(username, password, fullName, setError, navigate);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Реєстрація</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Логін:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                  />
                  {usernameError && (
                    <div className="invalid-feedback">Поле Логін не може бути порожнім</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Пароль:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  />
                  {passwordError && (
                    <div className="invalid-feedback">Пароль має бути не менше 8 символів</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Повне ім'я:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`form-control ${fullNameError ? 'is-invalid' : ''}`}
                  />
                  {fullNameError && (
                    <div className="invalid-feedback">Поле Ім'я не може бути порожнім</div>
                  )}
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary w-100">
                  Зареєструватися
                </button>
              </form>

              <p className="mt-3 text-center">
                Вже є акаунт?{' '}
                <Link to="/login" className="text-primary">
                  Увійти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
