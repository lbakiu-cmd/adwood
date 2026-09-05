import React from 'react';
import { Calendar, Inbox, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenInquiries, inquiriesCount = 0 }) {
  const scrollTo = (percentage) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalHeight * percentage,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navbar">
      <a href="#" className="nav-brand interactive" onClick={(e) => { e.preventDefault(); scrollTo(0); }}>
        <div className="brand-monogram">AW</div>
        <div>
          <h1 className="brand-title">ADWOOD</h1>
          <p className="brand-subtitle">Architectural Realization</p>
        </div>
      </a>

      <ul className="nav-links interactive">
        <li>
          <button className="nav-link" onClick={() => scrollTo(0)}>
            Overview
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => scrollTo(0.32)}>
            Structure
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => scrollTo(0.65)}>
            Realization
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => scrollTo(0.98)}>
            Atmosphere
          </button>
        </li>
      </ul>

      <div className="nav-actions interactive">
        <button
          className="btn-secondary"
          onClick={onOpenInquiries}
          title="Review submitted consultation inquiries"
        >
          <Inbox size={15} />
          <span>Inquiries</span>
          {inquiriesCount > 0 && (
            <span style={{
              background: 'var(--gold-primary)',
              color: '#0b0c0e',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '1px 6px',
              borderRadius: '8px'
            }}>
              {inquiriesCount}
            </span>
          )}
        </button>

        <button className="btn-primary" onClick={onOpenBooking}>
          <Calendar size={15} />
          <span>Book Consultation</span>
        </button>
      </div>
    </nav>
  );
}
