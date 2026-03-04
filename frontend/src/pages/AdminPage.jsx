import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function AdminPage({ auth }) {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const data = await api.getPendingCars(auth.user.token);
      setCars(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onAction = async (carId, status) => {
    setError('');
    try {
      await api.updateCarStatus(carId, status, auth.user.token);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="stack">
      <h2>Pending Car Approvals</h2>
      {cars.length === 0 && <p className="muted">No pending cars.</p>}

      <div className="grid">
        {cars.map((car) => (
          <article className="card" key={car.id}>
            <h3>{car.brand} {car.model}</h3>
            <p className="muted">Dealer: {car.dealerName}</p>
            <p>{car.description || 'No description'}</p>
            <div className="row gap">
              <button className="btn success" onClick={() => onAction(car.id, 'APPROVED')}>Approve</button>
              <button className="btn danger" onClick={() => onAction(car.id, 'REJECTED')}>Reject</button>
            </div>
          </article>
        ))}
      </div>

      {error && <p className="error">{error}</p>}
    </section>
  );
}