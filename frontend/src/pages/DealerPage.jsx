import { useEffect, useState } from 'react';
import { api, API_BASE } from '../api/client';
import CarImage from '../components/CarImage';

export default function DealerPage({ auth }) {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    manufacturingYear: '',
    price: '',
    description: ''
  });
  const [cars, setCars] = useState([]);
  const [uploadingId, setUploadingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadCars = async () => {
    try {
      const data = await api.getDealerCars(auth.user.token);
      setCars(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.createCar({
        ...form,
        manufacturingYear: Number(form.manufacturingYear),
        price: Number(form.price)
      }, auth.user.token);
      setForm({ brand: '', model: '', manufacturingYear: '', price: '', description: '' });
      setMessage('Car listing created (PENDING).');
      await loadCars();
    } catch (err) {
      setError(err.message);
    }
  };

  const onUpload = async (carId, file) => {
    if (!file) return;
    setError('');
    setUploadingId(carId);
    try {
      await api.uploadCarImage(carId, file, auth.user.token);
      await loadCars();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <section className="stack">
      <article className="card">
        <h2>Create Car Listing</h2>
        <form className="form-grid" onSubmit={onCreate}>
          <label>Brand<input value={form.brand} onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))} required /></label>
          <label>Model<input value={form.model} onChange={(e) => setForm((p) => ({ ...p, model: e.target.value }))} required /></label>
          <label>Year<input value={form.manufacturingYear} onChange={(e) => setForm((p) => ({ ...p, manufacturingYear: e.target.value }))} required /></label>
          <label>Price<input value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required /></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></label>
          <button className="btn">Create Listing</button>
        </form>
      </article>

      <article className="card">
        <h2>My Listings</h2>
        {cars.length === 0 && <p className="muted">No cars yet.</p>}
        <div className="grid">
          {cars.map((car) => (
            <div key={car.id} className="card soft">
              <CarImage
                car={car}
                apiBase={API_BASE}
                className="thumb"
                alt={`${car.brand} ${car.model}`}
              />
              <h3>{car.brand} {car.model}</h3>
              <p className="muted">Status: {car.listingStatus}</p>
              <label className="file-input">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onUpload(car.id, e.target.files?.[0])}
                  disabled={uploadingId === car.id}
                />
              </label>
            </div>
          ))}
        </div>
      </article>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
}
