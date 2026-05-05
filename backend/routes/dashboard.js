const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  const totalLeads = db.prepare('SELECT COUNT(*) as count FROM leads').get().count;
  const newLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'New'").get().count;
  const qualifiedLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'Qualified'").get().count;
  const wonLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'Won'").get().count;
  const lostLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'Lost'").get().count;
  const totalDealValue = db.prepare('SELECT SUM(deal_value) as total FROM leads').get().total || 0;
  const wonDealValue = db.prepare("SELECT SUM(deal_value) as total FROM leads WHERE status = 'Won'").get().total || 0;

  res.json({ totalLeads, newLeads, qualifiedLeads, wonLeads, lostLeads, totalDealValue, wonDealValue });
});

module.exports = router;