import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CarsPage from './pages/CarsPage';
import CarDetailPage from './pages/CarDetailPage';
import DealerPage from './pages/DealerPage';
import AdminPage from './pages/AdminPage';

function getStoredSession() {
  const raw = localStorage.getItem('autobuy_session');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function ProtectedRoute({ user, children, roles }) {
  if (!user?.token) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/cars" replace />;
  return children;
}

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState(getStoredSession());

  const auth = useMemo(() => ({
    user,
    setUser: (session) => {
      setUser(session);
      localStorage.setItem('autobuy_session', JSON.stringify(session));
    },
    clear: () => {
      setUser(null);
      localStorage.removeItem('autobuy_session');
    }
  }), [user]);

  const showAppNavbar = location.pathname !== '/';

  return (
    <div className="app-shell">
      {showAppNavbar && <Navbar user={user} onLogout={auth.clear} />}
      <main className={showAppNavbar ? 'page' : ''}>
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/login" element={<LoginPage auth={auth} />} />
          <Route path="/register" element={<RegisterPage auth={auth} />} />

          <Route
            path="/cars"
            element={
              <ProtectedRoute user={user}>
                <CarsPage auth={auth} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cars/:id"
            element={
              <ProtectedRoute user={user}>
                <CarDetailPage auth={auth} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dealer"
            element={
              <ProtectedRoute user={user} roles={['DEALER']}>
                <DealerPage auth={auth} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} roles={['ADMIN']}>
                <AdminPage auth={auth} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}