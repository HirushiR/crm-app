const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/auth');

// Get notes for a lead
router.get('/:leadId', auth, (req, res) => {
  const notes = db.prepare('SELECT * FROM notes WHERE lead_id = ? ORDER BY created_at DESC')
    .all(req.params.leadId);
  res.json(notes);
});

// Add note to a lead
router.post('/:leadId', auth, (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'Note content is required' });

  const result = db.prepare('INSERT INTO notes (lead_id, content, created_by) VALUES (?, ?, ?)')
    .run(req.params.leadId, content, req.user.name);

  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(note);
});

// Delete note
router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM notes WHERE id = ?').run(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;