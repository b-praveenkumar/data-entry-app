// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes, Route as BrowserRouterRoute } from 'react-router-dom'; // Import Routes and Route

import DataEntryForm from './DataEntryForm';
import FetchDataPage from './FetchDataPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/store">Store Data</Link>
            </li>
            <li>
              <Link to="/fetch">Fetch Data</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <BrowserRouterRoute path="/store" element={<DataEntryForm />} />
          <BrowserRouterRoute path="/fetch" element={<FetchDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
