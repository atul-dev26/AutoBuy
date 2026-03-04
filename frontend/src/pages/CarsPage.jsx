import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, API_BASE } from '../api/client';
import CarImage from '../components/CarImage';

export default function CarsPage({ auth }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getApprovedCars(auth.user.token);
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [auth.user.token]);

  useEffect(() => {
    const sections = document.querySelectorAll('.inventory-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
          else entry.target.classList.remove('visible');
        });
      },
      { threshold: 0.35, root: document.querySelector('.inventory-scroll') || null }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [cars]);

  const carSections = useMemo(() => {
    const size = 3;
    const chunks = [];
    for (let i = 0; i < cars.length; i += size) {
      chunks.push(cars.slice(i, i + size));
    }
    return chunks;
  }, [cars]);

  const cardTag = (index) => (index % 2 === 0 ? 'Discover' : 'Shop Now');
  const cardTone = (index) => `tone-${(index % 6) + 1}`;

  const cleanDescription = (text) => {
    if (!text) return 'A premium model designed for comfort, performance, and modern driving needs.';
    return text.length > 170 ? `${text.slice(0, 167)}...` : text;
  };

  return (
    <section className="inventory-shell">
      <div className="inventory-head">
        <h2>Discover Our Inventory</h2>
        <p>Explore available cars and open details for full specs, pricing, and EMI options.</p>
        <span>{cars.length} available</span>
      </div>

      {loading && <p className="inventory-feedback">Loading inventory...</p>}
      {error && <p className="error inventory-feedback">{error}</p>}

      <div className="inventory-scroll">
        {carSections.map((section, sectionIndex) => (
          <section
            key={`section-${sectionIndex}`}
            className={`inventory-section ${sectionIndex === 0 ? 'visible' : ''}`}
          >
            <div className="inventory-grid">
              {section.map((car, index) => {
                const globalIndex = sectionIndex * 3 + index;
                return (
                  <article key={car.id} className={`inventory-card ${cardTone(globalIndex)}`}>
                    <div className="inventory-card-top">
                      <span className={`inventory-chip ${globalIndex % 2 !== 0 ? 'accent' : ''}`}>
                        {cardTag(globalIndex)}
                      </span>
                      <span className="inventory-icon">&#10227;</span>
                    </div>

                    <CarImage
                      car={car}
                      apiBase={API_BASE}
                      className="inventory-car-image"
                      alt={`${car.brand} ${car.model}`}
                    />

                    <div className="inventory-copy">
                      <h3>The {car.brand} {car.model}</h3>
                      <p>{cleanDescription(car.description)}</p>
                      <p className="inventory-price">INR {Number(car.price).toLocaleString()}</p>
                    </div>

                    <div className="inventory-actions">
                      <Link className="inventory-explore" to={`/cars/${car.id}`}>Explore</Link>
                      <div className="inventory-mini-links">
                        <Link to={`/cars/${car.id}`}>Test Drive</Link>
                        <Link to={`/cars/${car.id}`}>Learn</Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
