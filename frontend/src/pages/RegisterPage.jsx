import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function RegisterPage({ auth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'BUYER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.register(form);
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
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Full Name
          <input value={form.fullName} onChange={(e) => onChange('fullName', e.target.value)} required />
        </label>

        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={form.password} onChange={(e) => onChange('password', e.target.value)} required />
        </label>

        <label>
          Role
          <select value={form.role} onChange={(e) => onChange('role', e.target.value)}>
            <option value="BUYER">BUYER</option>
            <option value="DEALER">DEALER</option>
          </select>
        </label>

        {error && <p className="error">{error}</p>}

        <button className="btn" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
    </section>
  );
}