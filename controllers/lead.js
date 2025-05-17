const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createLead = async (req, res) => {
  try {
    const { name, email, company, status = 'new' } = req.body;
    
    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Name, email, and company are required' });
    }
    
    const validStatuses = ['new', 'contacted', 'converted'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Status must be new, contacted, or converted' });
    }
    
    // Generate UUID 
    const id = uuidv4();
    const created_at = new Date();
    
    const query = `
      INSERT INTO leads (id, name, email, company, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $6)
      RETURNING *
    `;
    
    const values = [id, name, email, company, status, created_at];
    const result = await db.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Server error while creating lead' });
  }
};

const getLeads = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Server error while fetching leads' });
  }
};

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM leads WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Server error while fetching lead' });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, company, status } = req.body;
    const updated_at = new Date();
    
    const checkResult = await db.query('SELECT * FROM leads WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    if (status) {
      const validStatuses = ['new', 'contacted', 'converted'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status must be new, contacted, or converted' });
      }
    }
    
    let updateFields = [];
    let values = [];
    let paramCounter = 1;
    
    if (name) {
      updateFields.push(`name = $${paramCounter++}`);
      values.push(name);
    }
    
    if (email) {
      updateFields.push(`email = $${paramCounter++}`);
      values.push(email);
    }
    
    if (company) {
      updateFields.push(`company = $${paramCounter++}`);
      values.push(company);
    }
    
    if (status) {
      updateFields.push(`status = $${paramCounter++}`);
      values.push(status);
    }
    
    updateFields.push(`updated_at = $${paramCounter++}`);
    values.push(updated_at);
    
    values.push(id);
    
    const query = `
      UPDATE leads
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCounter}
      RETURNING *
    `;
    
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Server error while updating lead' });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const checkResult = await db.query('SELECT * FROM leads WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    await db.query('DELETE FROM leads WHERE id = $1', [id]);
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Server error while deleting lead' });
  }
};


const scoreLead = async (req, res) => {
  try {
    const { id } = req.params;
    
    
    const checkResult = await db.query('SELECT * FROM leads WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    // generating random no 
    const score = Math.floor(Math.random() * 100) + 1;
    
    res.json({
      lead_id: id,
      score: score
    });
  } catch (error) {
    console.error('Error scoring lead:', error);
    res.status(500).json({ error: 'Server error while scoring lead' });
  }
};
module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  scoreLead
};