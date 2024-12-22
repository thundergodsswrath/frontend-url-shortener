import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ShortenURL from './pages/ShortenURL';
import AllUrlPage from './pages/AllUrlPage';
import LinkClicksPage from './pages/LinkClicksPage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/shorten"
        element={
          <ProtectedRoute>
            <ShortenURL />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-urls"
        element={
          <ProtectedRoute>
            <AllUrlPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/link/:short"
        element={
          <ProtectedRoute>
            <LinkClicksPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
