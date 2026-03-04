import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, API_BASE } from '../api/client';
import CarImage from '../components/CarImage';

export default function CarDetailPage({ auth }) {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [emiInput, setEmiInput] = useState({
    principal: '',
    annualInterestRate: '9.5',
    tenureMonths: '60'
  });
  const [emiResult, setEmiResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setError('');
      try {
        const data = await api.getCarById(id, auth.user.token);
        setCar(data);
        setEmiInput((prev) => ({ ...prev, principal: String(data.price) }));
      } catch (err) {
        setError(err.message);
      }
    };

    load();
  }, [id, auth.user.token]);

  const onCalc = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.calculateEmi({
        principal: Number(emiInput.principal),
        annualInterestRate: Number(emiInput.annualInterestRate),
        tenureMonths: Number(emiInput.tenureMonths)
      }, auth.user.token);
      setEmiResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!car) return <p>{error || 'Loading car detail...'}</p>;

  return (
    <section className="stack">
      <article className="card">
        <CarImage
          car={car}
          apiBase={API_BASE}
          className="hero"
          alt={`${car.brand} ${car.model}`}
        />
        <h2>{car.brand} {car.model}</h2>
        <p className="muted">Year: {car.manufacturingYear}</p>
        <p className="price">INR {Number(car.price).toLocaleString()}</p>
        <p>{car.description || 'No description available.'}</p>
      </article>

      <article className="card">
        <h3>EMI Calculator</h3>
        <form className="form-grid" onSubmit={onCalc}>
          <label>
            Principal
            <input value={emiInput.principal} onChange={(e) => setEmiInput((p) => ({ ...p, principal: e.target.value }))} required />
          </label>
          <label>
            Annual Interest (%)
            <input value={emiInput.annualInterestRate} onChange={(e) => setEmiInput((p) => ({ ...p, annualInterestRate: e.target.value }))} required />
          </label>
          <label>
            Tenure (months)
            <input value={emiInput.tenureMonths} onChange={(e) => setEmiInput((p) => ({ ...p, tenureMonths: e.target.value }))} required />
          </label>
          <button className="btn">Calculate EMI</button>
        </form>

        {emiResult && (
          <div className="result-box">
            <p>Monthly EMI: <strong>INR {Number(emiResult.monthlyEmi).toLocaleString()}</strong></p>
            <p>Total Amount: INR {Number(emiResult.totalAmount).toLocaleString()}</p>
            <p>Total Interest: INR {Number(emiResult.totalInterest).toLocaleString()}</p>
          </div>
        )}
      </article>

      {error && <p className="error">{error}</p>}
    </section>
  );
}
