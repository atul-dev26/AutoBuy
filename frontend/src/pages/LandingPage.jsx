import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LandingPage({ user }) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-wrap">
      <header className="landing-nav">
        <div className="brandmark">
          <span className="logo-box">?</span>
          <span>CarHub</span>
        </div>

        <nav className="landing-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </nav>

        <Link className="cta-dark" to={user ? '/cars' : '/login'}>
          {user ? 'Enter App' : 'Book Now'}
        </Link>
      </header>

      <section id="home" className="hero-scene">
        <div className="hero-content reveal visible">
          <h1>Welcome to our<br />Car Dealership</h1>
          <p>Discover the latest car models, compare features, and find the perfect vehicle for your needs.</p>
          <Link className="cta-dark big" to={user ? '/cars' : '/login'}>
            Shop Now
          </Link>
        </div>
      </section>

      <section id="about" className="landing-section reveal">
        <h2>About Us</h2>
        <div className="two-col">
          <article className="feature-card tilt-card">
            <img src="https://images.unsplash.com/photo-1549925862-990f9f119f17?auto=format&fit=crop&w=1200&q=80" alt="Black car" />
            <div className="feature-copy">
              <h3>Introducing the New</h3>
              <p>Sleek design, powerful performance, and refined comfort for everyday driving.</p>
              <div className="feature-actions">
                <span className="ghost-link">Learn More</span>
                <Link className="cta-dark" to={user ? '/cars' : '/login'}>Book a Test Drive</Link>
              </div>
            </div>
          </article>

          <article className="feature-card tilt-card light">
            <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80" alt="White car" />
            <div className="feature-copy">
              <h3>Our Top Sellers</h3>
              <p>Experience the pinnacle of luxury and engineering for city and highway use.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="products" className="landing-section reveal">
        <div className="split-layout">
          <div>
            <h2>Explore Our Partnerships</h2>
            <p>We have teamed up with leading car manufacturers to bring you the best selection of vehicles.</p>
            <div className="chip-row">
              <button className="chip">View Partners</button>
              <button className="chip active">Contact</button>
              <button className="chip">Careers</button>
            </div>
          </div>

          <article className="feature-card tilt-card light">
            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=80" alt="Red car" />
            <div className="feature-copy">
              <h3>Sophisticated Style</h3>
              <p>Timeless elegance and uncompromising performance.</p>
            </div>
          </article>
        </div>

        <div className="two-col">
          <article className="feature-card tilt-card">
            <img src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80" alt="White sedan" />
            <div className="feature-copy">
              <h3>Experience the Future of Driving</h3>
              <p>Our latest models redefine design boundaries and innovation.</p>
              <div className="feature-actions">
                <Link className="cta-dark" to={user ? '/cars' : '/login'}>Learn More</Link>
              </div>
            </div>
          </article>

          <article className="feature-card tilt-card">
            <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80" alt="Grey sedan" />
          </article>
        </div>
      </section>

      <section className="icon-strip reveal">
        <h2>Stay Connected</h2>
        <div className="icon-row">
          <span>Our</span>
          <span>Follow Us</span>
          <span>Join the</span>
          <span>Get in Touch</span>
          <span>Careers</span>
        </div>
      </section>

      <section id="contact" className="landing-section deep reveal">
        <div className="split-layout">
          <div>
            <h2>Elevate Your Driving Experience</h2>
            <p>Prepare to be captivated by the perfect fusion of design, power and technology.</p>
            <img
              className="float-car"
              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1100&q=80"
              alt="White sports car"
            />
          </div>

          <article className="feature-card tilt-card light">
            <img src="https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=1300&q=80" alt="Red sports car" />
            <div className="feature-copy">
              <h3>Uncompromising Performance</h3>
              <p>Combining sleek aerodynamics and advanced drivetrain systems.</p>
            </div>
          </article>
        </div>

        <div className="center-btn-wrap">
          <Link className="cta-dark big" to={user ? '/cars' : '/login'}>Schedule a Consultation</Link>
        </div>
      </section>

      <section className="brand-strip reveal">
        <h3>Connect with Us</h3>
        <div className="brands">Shell &nbsp; BMW &nbsp; Telegram &nbsp; Media</div>
      </section>

      <footer className="landing-footer">
        <div>
          <div className="brandmark footer-brand">
            <span className="logo-box">?</span>
            <span>CarHub</span>
          </div>
          <p>© 2026 CarHub, Inc.<br />All rights reserved.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Shop</p>
          <p>Blog</p>
          <p>FAQs</p>
        </div>

        <div>
          <h4>Connect with Us</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>

        <div>
          <h4>Get in Touch</h4>
          <p>Email</p>
          <p>Phone</p>
          <p>Address</p>
          <p>Careers</p>
        </div>
      </footer>
    </div>
  );
}