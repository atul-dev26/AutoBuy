import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function LoginPage({ auth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('buyer@autobuy.com');
  const [password, setPassword] = useState('Buyer@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login({ email, password });
      auth.setUser(res);
      navigate('/cars');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card narrow">
      <h2>Login</h2>
      <p className="muted">Use seeded accounts for quick testing.</p>

      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="muted">No account? <Link to="/register">Register</Link></p>
    </section>
  );
}