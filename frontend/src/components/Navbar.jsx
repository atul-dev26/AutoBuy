import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link className="brand" to="/cars">AutoBuy</Link>
        {user && <span className="badge">{user.role}</span>}
      </div>

      <nav className="nav-links">
        {user && <Link to="/cars">Cars</Link>}
        {user?.role === 'DEALER' && <Link to="/dealer">Dealer</Link>}
        {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
      </nav>

      {user && (
        <button className="btn danger" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
}