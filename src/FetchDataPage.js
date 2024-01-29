// FetchDataPage.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FetchDataPage = () => {
  const [criteria, setCriteria] = useState({
    name: '',
    school: '',
    week: '',
  });
  const [fetchedData, setFetchedData] = useState([]);

  const handleFetchData = async () => {
    try {
      const queryParams = new URLSearchParams(criteria);
      const response = await fetch(`/api/entries?${queryParams}`);
      const result = await response.json();

      if (result.length > 0) {
        setFetchedData(result);
      } else {
        setFetchedData([]);
      }

      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Fetch Data</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={criteria.name}
            onChange={(e) => setCriteria({ ...criteria, name: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="school" className="form-label">
            School:
          </label>
          <input
            type="text"
            id="school"
            className="form-control"
            value={criteria.school}
            onChange={(e) => setCriteria({ ...criteria, school: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="week" className="form-label">
            Week:
          </label>
          <input
            type="text"
            id="week"
            className="form-control"
            value={criteria.week}
            onChange={(e) => setCriteria({ ...criteria, week: e.target.value })}
          />
        </div>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleFetchData}>
        Submit
      </button>
      <div>
        {fetchedData.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>School</th>
                <th>Week</th>
                <th>Competencies Met</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((data) => (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.school}</td>
                  <td>{data.week}</td>
                  <td>{data.competenciesMet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default FetchDataPage;
