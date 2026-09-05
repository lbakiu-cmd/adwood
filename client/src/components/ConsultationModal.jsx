import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Send, Sparkles } from 'lucide-react';
import { submitConsultation } from '../services/api.js';

export default function ConsultationModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Penthouse Residence',
    budgetRange: '€250k - €500k',
    timeline: 'Immediate (1-3 mos)',
    location: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message, recordId }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    try {
      const res = await submitConsultation(formData);
      setFeedback({
        type: 'success',
        message: res.message || 'Consultation request submitted successfully.',
        recordId: res.data?.id
      });

      if (onSuccess) onSuccess(res.data);

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          projectType: 'Penthouse Residence',
          budgetRange: '€250k - €500k',
          timeline: 'Immediate (1-3 mos)',
          location: '',
          notes: ''
        });
      }, 1000);
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'An error occurred while submitting your inquiry.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-eyebrow">Haute Architecture Consultation</div>
          <h2 className="modal-title">Initiate Your Realization</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px' }}>
            Direct engagement with our principal architect and construction director.
          </p>
        </div>

        {feedback?.type === 'success' ? (
          <div className="form-feedback success" style={{ textAlign: 'center', padding: '2rem' }}>
            <CheckCircle size={42} style={{ color: '#4caf50', margin: '0 auto 12px auto' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
              Inquiry Registered
            </h3>
            <p style={{ marginBottom: '12px', fontSize: '0.9rem' }}>{feedback.message}</p>
            {feedback.recordId && (
              <p style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontFamily: 'monospace' }}>
                Atelier Reference: <strong>{feedback.recordId}</strong>
              </p>
            )}
            <button
              className="btn-primary"
              style={{ marginTop: '1.5rem' }}
              onClick={() => {
                setFeedback(null);
                onClose();
              }}
            >
              Return to Showcase
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Julian de Vries"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="client@atelier.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Direct Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+33 1 42 68 55 00"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Classification</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Penthouse Residence">Penthouse Residence</option>
                  <option value="Private Villa">Private Villa</option>
                  <option value="Heritage Restoration">Heritage Restoration</option>
                  <option value="Commercial Flagship">Commercial Flagship</option>
                  <option value="Bespoke Joinery Suite">Bespoke Joinery Suite</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Budget</label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="€150,000 - €300,000">€150,000 – €300,000</option>
                  <option value="€300,000 - €600,000">€300,000 – €600,000</option>
                  <option value="€600,000 - €1,200,000">€600,000 – €1,200,000</option>
                  <option value="€1,200,000+">€1,200,000+ (Master Estate)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Realization Horizon</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Immediate (1-3 mos)">Immediate (1–3 months)</option>
                  <option value="Within 6 months">Within 6 months</option>
                  <option value="Architectural Planning">Architectural Planning Stage</option>
                </select>
              </div>

              <div className="form-group full">
                <label className="form-label">Site Location / City</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Place Vendôme, Paris or Lake Geneva"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Architectural Vision & Spatial Scope</label>
                <textarea
                  name="notes"
                  placeholder="Describe your property, architectural vision, ceiling height, or specific material preferences (walnut millwork, travertine fireplaces, custom lighting)..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>
            </div>

            {feedback?.type === 'error' && (
              <div className="form-feedback error" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} />
                <span>{feedback.message}</span>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                <Send size={15} />
                <span>{loading ? 'Submitting to Atelier...' : 'Submit Consultation Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
