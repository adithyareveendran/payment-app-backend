const db = require('../models/db');

exports.makePayment = (req, res) => {
  const { account_number, amount } = req.body;

  db.query('SELECT id FROM customers WHERE account_number = ?', [account_number], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Customer not found' });

    const customerId = results[0].id;
    const payment = {
      customer_id: customerId,
      payment_date: new Date(),
      amount,
      status: 'SUCCESS',
    };

    db.query('INSERT INTO payments SET ?', payment, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Payment successful' });
    });
  });
};

exports.getPaymentHistory = (req, res) => {
  const { account_number } = req.params;

  db.query('SELECT id FROM customers WHERE account_number = ?', [account_number], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Customer not found' });

    const customerId = results[0].id;

    db.query('SELECT * FROM payments WHERE customer_id = ?', [customerId], (err, payments) => {
      if (err) return res.status(500).json({ error: err });
      res.json(payments);
    });
  });
};
