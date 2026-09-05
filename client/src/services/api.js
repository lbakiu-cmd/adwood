const API_BASE = '/api';

export async function fetchConsultations() {
  try {
    const res = await fetch(`${API_BASE}/consultations`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch consultations`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching consultations:', err);
    throw err;
  }
}

export async function submitConsultation(formData) {
  try {
    const res = await fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit consultation request');
    }
    return data;
  } catch (err) {
    console.error('Error submitting consultation:', err);
    throw err;
  }
}
