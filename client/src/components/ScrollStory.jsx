import React from 'react';
import { ArrowRight, Compass, Layers, Hammer, Sparkles } from 'lucide-react';

export default function ScrollStory({ scrollProgress, onOpenBooking }) {
  // Current active step calculation
  const getActiveStep = () => {
    if (scrollProgress < 0.22) return 0;
    if (scrollProgress < 0.52) return 1;
    if (scrollProgress < 0.82) return 2;
    return 3;
  };

  const activeStep = getActiveStep();

  const scrollTo = (percentage) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalHeight * percentage,
      behavior: 'smooth'
    });
  };

  return (
    <div className="content-layer">
      {/* Realization Progress HUD */}
      <aside className="progress-hud interactive" aria-label="Realization Stages">
        {[
          { label: '01 Spatial Concept', progress: 0.05 },
          { label: '02 Materiality', progress: 0.35 },
          { label: '03 Realization', progress: 0.68 },
          { label: '04 Living Space', progress: 0.98 }
        ].map((step, idx) => (
          <div
            key={idx}
            className={`hud-step ${activeStep === idx ? 'active' : ''}`}
            onClick={() => scrollTo(step.progress)}
          >
            <span className="hud-step-name">{step.label}</span>
            <span className="hud-step-dot" />
          </div>
        ))}
      </aside>

      {/* Stage 0: Hero Section */}
      <section className="stage-section hero">
        <div className="hero-content interactive">
          <p className="hero-tag">Interior Architecture & Construction</p>
          <h1 className="hero-heading">
            Where Pure Space <br />
            Becomes <em>Realized</em>.
          </h1>
          <p className="hero-subheading">
            ADWOOD bridges visionary architectural design with uncompromising on-site fabrication.
            Scroll to witness the metamorphosis of a double-height volume into a bespoke living suite.
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={onOpenBooking}>
              <span>Initiate Consultation</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => scrollTo(0.35)}>
              <span>Explore Realization</span>
            </button>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to Construct</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </section>

      {/* Stage 1: Spatial Concept & Geometry */}
      <section className="stage-section">
        <div className="stage-card interactive">
          <div className="stage-badge">
            <Compass size={14} />
            <span>Phase 01 / Spatial Volumetrics</span>
          </div>
          <h2 className="stage-title">
            The Structural <span>Void</span>
          </h2>
          <p className="stage-desc">
            Every creation begins with pure spatial proportions. We calibrate sightlines, natural daylight
            apertures, and acoustic thresholds before the first timber panel is cut.
          </p>
          <div className="stage-metrics">
            <div>
              <span className="metric-val">120m²</span>
              <span className="metric-lbl">Volume Footprint</span>
            </div>
            <div>
              <span className="metric-val">4.5m</span>
              <span className="metric-lbl">Ceiling Clearance</span>
            </div>
            <div>
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Bespoke Layout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2: Materiality & Craft */}
      <section className="stage-section" style={{ justifyContent: 'flex-end' }}>
        <div className="stage-card interactive">
          <div className="stage-badge">
            <Layers size={14} />
            <span>Phase 02 / Materiality Selection</span>
          </div>
          <h2 className="stage-title">
            Noble Stone & <span>Walnut</span>
          </h2>
          <p className="stage-desc">
            Raw materials enter our atelier: Italian travertine marble with honed matte finish, deep-grained
            American black walnut, and hand-patinated champagne brass joinery trims.
          </p>
          <div className="stage-metrics">
            <div>
              <span className="metric-val">Travertine</span>
              <span className="metric-lbl">Porous Honed Stone</span>
            </div>
            <div>
              <span className="metric-val">FSC Walnut</span>
              <span className="metric-lbl">Sustainable Timber</span>
            </div>
            <div>
              <span className="metric-val">Brass</span>
              <span className="metric-lbl">Brushed Metallic Trim</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 3: On-Site Realization */}
      <section className="stage-section">
        <div className="stage-card interactive">
          <div className="stage-badge">
            <Hammer size={14} />
            <span>Phase 03 / On-Site Realization</span>
          </div>
          <h2 className="stage-title">
            Precision <span>Assembly</span>
          </h2>
          <p className="stage-desc">
            Our permanent team of master joiners, masons, and lighting technicians executes the realization
            on-site. Watch furniture blocks slide into millimeter-perfect architectural alignment.
          </p>
          <div className="stage-metrics">
            <div>
              <span className="metric-val">±0.5mm</span>
              <span className="metric-lbl">Millwork Tolerance</span>
            </div>
            <div>
              <span className="metric-val">Direct</span>
              <span className="metric-lbl">Atelier Execution</span>
            </div>
            <div>
              <span className="metric-val">Turnkey</span>
              <span className="metric-lbl">Supervision</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 4: The Realized Living Space */}
      <section className="stage-section" style={{ justifyContent: 'center', minHeight: '110vh' }}>
        <div className="stage-card interactive" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div className="stage-badge" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} />
            <span>Phase 04 / Turnkey Reality</span>
          </div>
          <h2 className="stage-title">
            Your Residence, <span>Realized</span>
          </h2>
          <p className="stage-desc">
            From the initial sketch to the final illuminated chandelier, ADWOOD orchestrates the complete
            transformation of luxury residences, penthouses, and private estates worldwide.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button className="btn-primary" onClick={onOpenBooking}>
              <span>Reserve Your Design Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
