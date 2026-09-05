import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import SceneCanvas from './components/SceneCanvas.jsx';
import ScrollStory from './components/ScrollStory.jsx';
import ConsultationModal from './components/ConsultationModal.jsx';
import InquiriesDrawer from './components/InquiriesDrawer.jsx';
import { fetchConsultations } from './services/api.js';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isInquiriesOpen, setIsInquiriesOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Track window scroll progress (0 to 1)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch inquiries from Node backend
  const loadInquiries = async () => {
    try {
      setLoadingInquiries(true);
      const res = await fetchConsultations();
      if (res && res.data) {
        setInquiries(res.data);
      }
    } catch (err) {
      console.warn('Backend connection notice:', err.message);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleConsultationSuccess = (newRecord) => {
    setInquiries(prev => [newRecord, ...prev]);
  };

  return (
    <div className="app-container">
      {/* Central 3D Canvas using React Three Fiber */}
      <SceneCanvas scrollProgress={scrollProgress} />

      {/* Luxury Navigation Header */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenInquiries={() => setIsInquiriesOpen(true)}
        inquiriesCount={inquiries.length}
      />

      {/* Editorial Scroll-bound Realization Chapters */}
      <ScrollStory
        scrollProgress={scrollProgress}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={handleConsultationSuccess}
      />

      {/* Inquiries / Live Database Drawer */}
      <InquiriesDrawer
        isOpen={isInquiriesOpen}
        onClose={() => setIsInquiriesOpen(false)}
        inquiries={inquiries}
        onRefresh={loadInquiries}
        loading={loadingInquiries}
      />
    </div>
  );
}
