const { pool } = require('../config/db');
const path = require('path');
const fs = require('fs');

// ─── PROFILE ────────────────────────────────────────────────
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profile LIMIT 1');
    res.json({ success: true, data: rows[0] || {} });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, title, summary, phone, email, linkedin, github, location, available } = req.body;
    const [rows] = await pool.query('SELECT id FROM profile LIMIT 1');
    if (rows.length === 0) {
      await pool.query('INSERT INTO profile (name,title,summary,phone,email,linkedin,github,location,available) VALUES (?,?,?,?,?,?,?,?,?)',
        [name, title, summary, phone, email, linkedin, github, location, available]);
    } else {
      await pool.query('UPDATE profile SET name=?,title=?,summary=?,phone=?,email=?,linkedin=?,github=?,location=?,available=? WHERE id=?',
        [name, title, summary, phone, email, linkedin, github, location, available, rows[0].id]);
    }
    const [updated] = await pool.query('SELECT * FROM profile LIMIT 1');
    res.json({ success: true, data: updated[0] });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const photoUrl = `/uploads/${req.file.filename}`;

    // Delete old photo
    const [rows] = await pool.query('SELECT photo_url FROM profile LIMIT 1');
    if (rows[0]?.photo_url) {
      const oldPath = path.join(__dirname, '..', rows[0].photo_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await pool.query('UPDATE profile SET photo_url = ? WHERE id = (SELECT id FROM (SELECT id FROM profile LIMIT 1) t)', [photoUrl]);
    res.json({ success: true, photo_url: photoUrl });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// ─── EXPERIENCE ─────────────────────────────────────────────
exports.getExperience = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM experience ORDER BY sort_order ASC');
    const parsed = rows.map(r => ({ ...r, bullets: typeof r.bullets === 'string' ? JSON.parse(r.bullets) : r.bullets }));
    res.json({ success: true, data: parsed });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createExperience = async (req, res) => {
  try {
    const { company, role, location, start_date, end_date, is_current, bullets, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO experience (company,role,location,start_date,end_date,is_current,bullets,sort_order) VALUES (?,?,?,?,?,?,?,?)',
      [company, role, location, start_date, end_date, is_current, JSON.stringify(bullets || []), sort_order || 0]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateExperience = async (req, res) => {
  try {
    const { company, role, location, start_date, end_date, is_current, bullets, sort_order } = req.body;
    await pool.query(
      'UPDATE experience SET company=?,role=?,location=?,start_date=?,end_date=?,is_current=?,bullets=?,sort_order=? WHERE id=?',
      [company, role, location, start_date, end_date, is_current, JSON.stringify(bullets || []), sort_order, req.params.id]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteExperience = async (req, res) => {
  try {
    await pool.query('DELETE FROM experience WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// ─── PROJECTS ───────────────────────────────────────────────
exports.getProjects = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY sort_order ASC');
    const parsed = rows.map(r => ({ ...r, tech_stack: typeof r.tech_stack === 'string' ? JSON.parse(r.tech_stack) : r.tech_stack }));
    res.json({ success: true, data: parsed });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, tech_stack, github_url, live_url, featured, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO projects (title,description,tech_stack,github_url,live_url,featured,sort_order) VALUES (?,?,?,?,?,?,?)',
      [title, description, JSON.stringify(tech_stack || []), github_url, live_url, featured, sort_order || 0]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, tech_stack, github_url, live_url, featured, sort_order } = req.body;
    await pool.query(
      'UPDATE projects SET title=?,description=?,tech_stack=?,github_url=?,live_url=?,featured=?,sort_order=? WHERE id=?',
      [title, description, JSON.stringify(tech_stack || []), github_url, live_url, featured, sort_order, req.params.id]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteProject = async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// ─── SKILLS ─────────────────────────────────────────────────
exports.getSkills = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY category, sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createSkill = async (req, res) => {
  try {
    const { category, name, level, color, sort_order } = req.body;
    const [result] = await pool.query('INSERT INTO skills (category,name,level,color,sort_order) VALUES (?,?,?,?,?)',
      [category, name, level || 80, color || 'purple', sort_order || 0]);
    res.json({ success: true, id: result.insertId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateSkill = async (req, res) => {
  try {
    const { category, name, level, color, sort_order } = req.body;
    await pool.query('UPDATE skills SET category=?,name=?,level=?,color=?,sort_order=? WHERE id=?',
      [category, name, level, color, sort_order, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteSkill = async (req, res) => {
  try {
    await pool.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// ─── EDUCATION ──────────────────────────────────────────────
exports.getEducation = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM education ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createEducation = async (req, res) => {
  try {
    const { institution, degree, field, score, start_date, end_date, sort_order } = req.body;
    const [result] = await pool.query('INSERT INTO education (institution,degree,field,score,start_date,end_date,sort_order) VALUES (?,?,?,?,?,?,?)',
      [institution, degree, field, score, start_date, end_date, sort_order || 0]);
    res.json({ success: true, id: result.insertId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateEducation = async (req, res) => {
  try {
    const { institution, degree, field, score, start_date, end_date, sort_order } = req.body;
    await pool.query('UPDATE education SET institution=?,degree=?,field=?,score=?,start_date=?,end_date=?,sort_order=? WHERE id=?',
      [institution, degree, field, score, start_date, end_date, sort_order, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteEducation = async (req, res) => {
  try {
    await pool.query('DELETE FROM education WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// ─── CERTIFICATIONS ─────────────────────────────────────────
exports.getCertifications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM certifications ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.createCertification = async (req, res) => {
  try {
    const { name, issuer, year, url, sort_order } = req.body;
    const [result] = await pool.query('INSERT INTO certifications (name,issuer,year,url,sort_order) VALUES (?,?,?,?,?)',
      [name, issuer, year, url, sort_order || 0]);
    res.json({ success: true, id: result.insertId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteCertification = async (req, res) => {
  try {
    await pool.query('DELETE FROM certifications WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// ─── MESSAGES ───────────────────────────────────────────────
exports.getMessages = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.sendMessage = async (req, res) => {
  try {
    const { sender_name, sender_email, subject, message } = req.body;
    if (!sender_name || !sender_email || !message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    await pool.query('INSERT INTO messages (sender_name,sender_email,subject,message) VALUES (?,?,?,?)',
      [sender_name, sender_email, subject, message]);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.markMessageRead = async (req, res) => {
  try {
    await pool.query('UPDATE messages SET is_read = TRUE WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteMessage = async (req, res) => {
  try {
    await pool.query('DELETE FROM messages WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// ─── FULL PORTFOLIO ─────────────────────────────────────────
exports.getFullPortfolio = async (req, res) => {
  try {
    const [profile] = await pool.query('SELECT * FROM profile LIMIT 1');
    const [experience] = await pool.query('SELECT * FROM experience ORDER BY sort_order');
    const [projects] = await pool.query('SELECT * FROM projects ORDER BY sort_order');
    const [skills] = await pool.query('SELECT * FROM skills ORDER BY category, sort_order');
    const [education] = await pool.query('SELECT * FROM education ORDER BY sort_order');
    const [certifications] = await pool.query('SELECT * FROM certifications ORDER BY sort_order');

    res.json({
      success: true,
      data: {
        profile: profile[0],
        experience: experience.map(r => ({ ...r, bullets: typeof r.bullets === 'string' ? JSON.parse(r.bullets) : r.bullets })),
        projects: projects.map(r => ({ ...r, tech_stack: typeof r.tech_stack === 'string' ? JSON.parse(r.tech_stack) : r.tech_stack })),
        skills,
        education,
        certifications,
      }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
