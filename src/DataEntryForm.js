// DataEntryForm.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DataEntryForm.css';

const DataEntryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    week: 'Week 1',
    school: '',
    staffName: 'Staff 1',
    competenciesMet: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.week || !formData.school || !formData.staffName || !formData.competenciesMet) {
        setSubmissionStatus('All fields are required');
        return;
      }

      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('Successfully submitted!');
        setFormData({
          name: '',
          week: 'Week 1',
          school: '',
          staffName: 'Staff 1',
          competenciesMet: '',
        });
      } else {
        const result = await response.json();
        setSubmissionStatus(`Submission failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmissionStatus('Internal server error');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Data Entry Form</h2>
      <form className="data-entry-form p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="week" className="form-label">Week:</label>
          <select
            id="week"
            name="week"
            value={formData.week}
            onChange={(e) => setFormData({ ...formData, week: e.target.value })}
            className="form-select"
          >
            {[...Array(10).keys()].map((week) => (
              <option key={week + 1}>Week {week + 1}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="school" className="form-label">School:</label>
          <input
            type="text"
            id="school"
            name="school"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="staffName" className="form-label">Staff Name:</label>
          <select
            id="staffName"
            name="staffName"
            value={formData.staffName}
            onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
            className="form-select"
          >
            {[...Array(20).keys()].map((staff) => (
              <option key={staff + 1}>Staff {staff + 1}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="competenciesMet" className="form-label">Competencies Met:</label>
          <textarea
            id="competenciesMet"
            name="competenciesMet"
            value={formData.competenciesMet}
            onChange={(e) => setFormData({ ...formData, competenciesMet: e.target.value })}
            className="form-control"
            rows="4"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        {submissionStatus && (
          <div className={`mt-3 alert ${submissionStatus.includes('Successfully') ? 'alert-success' : 'alert-danger'}`}>
            {submissionStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default DataEntryForm;


  