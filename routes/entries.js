// entries.js

const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// Route to create a new data entry
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.week || !req.body.school || !req.body.staffName || !req.body.competenciesMet) {
      return res.status(400).json({ message: 'Name, week, school, staffName, and competenciesMet are required' });
    }

    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.json({ message: 'Data entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch data based on name, school, or week
router.get('/', async (req, res) => {
  const { name, school, week } = req.query;

  try {
    let query = {};
    
    if (name) {
      query.name = name;
    }

    if (school) {
      query.school = school;
    }

    if (week) {
      query.week = week;
    }

    const result = await Entry.find(query);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json({ message: 'No data available for the specified criteria' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
