const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/auth');

// Get all leads with optional filters
router.get('/', auth, (req, res) => {
  const { status, source, assigned_to, search } = req.query;
  let query = 'SELECT * FROM leads WHERE 1=1';
  const params = [];

  if (status) { query += ' AND status = ?'; params.push(status); }
  if (source) { query += ' AND lead_source = ?'; params.push(source); }
  if (assigned_to) { query += ' AND assigned_to = ?'; params.push(assigned_to); }
  if (search) {
    query += ' AND (lead_name LIKE ? OR company_name LIKE ? OR email LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY created_at DESC';
  const leads = db.prepare(query).all(...params);
  res.json(leads);
});

// Get single lead
router.get('/:id', auth, (req, res) => {
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
});

// Create lead
router.post('/', auth, (req, res) => {
  const { lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value } = req.body;
  if (!lead_name) return res.status(400).json({ message: 'Lead name is required' });

  const result = db.prepare(`
    INSERT INTO leads (lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(lead_name, company_name, email, phone, lead_source, assigned_to, status || 'New', deal_value || 0);

  const newLead = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newLead);
});

// Update lead
router.put('/:id', auth, (req, res) => {
  const { lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value } = req.body;
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });

  db.prepare(`
    UPDATE leads SET lead_name=?, company_name=?, email=?, phone=?, lead_source=?,
    assigned_to=?, status=?, deal_value=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
  `).run(lead_name, company_name, email, phone, lead_source, assigned_to, status, deal_value, req.params.id);

  const updated = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// Delete lead
router.delete('/:id', auth, (req, res) => {
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  res.json({ message: 'Lead deleted' });
});

module.exports = router;