const db = require('../models/db');

exports.getAllCustomers = (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
