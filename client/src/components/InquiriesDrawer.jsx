import React, { useEffect } from 'react';
import { X, RefreshCw, Calendar, Mail, Phone, MapPin, Tag } from 'lucide-react';

export default function InquiriesDrawer({ isOpen, onClose, inquiries = [], onRefresh, loading = false }) {
  useEffect(() => {
    if (isOpen && onRefresh) {
      onRefresh();
    }
  }, [isOpen]);

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`drawer-container ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff' }}>
              Consultation Registry
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Node.js Backend Data Store ({inquiries.length} Inquiries)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn-secondary"
              style={{ padding: '8px 12px' }}
              onClick={onRefresh}
              disabled={loading}
              title="Refresh records from API"
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
            </button>
            <button
              className="modal-close-btn"
              style={{ position: 'static' }}
              onClick={onClose}
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="drawer-body">
          {inquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Calendar size={36} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
              <p>No consultation requests submitted yet.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '6px' }}>
                Use the "Book Consultation" button to submit a project inquiry.
              </p>
            </div>
          ) : (
            inquiries.map((item) => (
              <div key={item.id} className="inquiry-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="inquiry-id">{item.id}</span>
                  <span className="inquiry-badge">{item.status || 'Received'}</span>
                </div>

                <h4 className="inquiry-name">{item.fullName}</h4>

                <div className="inquiry-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={12} /> {item.email}
                  </span>
                  {item.phone && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={12} /> {item.phone}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '8px 0' }}>
                  <span className="inquiry-badge" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <Tag size={10} style={{ marginRight: '4px' }} />
                    {item.projectType}
                  </span>
                  <span className="inquiry-badge" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {item.budgetRange}
                  </span>
                  <span className="inquiry-badge" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {item.timeline}
                  </span>
                </div>

                {item.location && item.location !== 'Unspecified' && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', margin: '4px 0' }}>
                    <MapPin size={12} color="var(--gold-primary)" />
                    <span>{item.location}</span>
                  </div>
                )}

                {item.notes && (
                  <p className="inquiry-notes">
                    "{item.notes}"
                  </p>
                )}

                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Submitted: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
