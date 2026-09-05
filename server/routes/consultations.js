import express from 'express';
import { getConsultations, saveConsultation } from '../db.js';

const router = express.Router();

// GET all consultations
router.get('/', async (req, res) => {
  try {
    const records = await getConsultations();
    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve consultations', error: err.message });
  }
});

// POST new consultation booking
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      projectType,
      budgetRange,
      timeline,
      location,
      notes
    } = req.body;

    // Validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }

    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    if (!projectType) {
      return res.status(400).json({ success: false, message: 'Please select a project type.' });
    }

    const newRecord = await saveConsultation({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      projectType,
      budgetRange: budgetRange || 'Undisclosed',
      timeline: timeline || 'Flexible',
      location: location ? location.trim() : 'Unspecified',
      notes: notes ? notes.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'Design consultation request successfully received. Our principal architect will contact you.',
      data: newRecord
    });
  } catch (err) {
    console.error('Error in POST /api/consultations:', err);
    res.status(500).json({ success: false, message: 'Server error processing consultation', error: err.message });
  }
});

export default router;
