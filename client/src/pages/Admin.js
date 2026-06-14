import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import * as api from '../utils/api';

// ── Sidebar ────────────────────────────────────────────────────
const Sidebar = ({ unread }) => {
  const { logout } = useAuth();
  const nav = useNavigate();
  const handleLogout = () => { logout(); nav('/'); };

  const links = [
    { to: '/admin', label: 'Overview', icon: '📊', end: true },
    { to: '/admin/profile', label: 'Profile', icon: '👤' },
    { to: '/admin/experience', label: 'Experience', icon: '💼' },
    { to: '/admin/projects', label: 'Projects', icon: '🚀' },
    { to: '/admin/skills', label: 'Skills', icon: '⚡' },
    { to: '/admin/education', label: 'Education', icon: '🎓' },
    { to: '/admin/certifications', label: 'Certifications', icon: '🏆' },
    { to: '/admin/messages', label: `Messages${unread ? ` (${unread})` : ''}`, icon: '💬' },
  ];

  return (
    <div style={{
      width: 240, background: 'rgba(14,14,26,0.95)', borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column', minHeight: '100vh', flexShrink: 0,
      position: 'sticky', top: 0,
    }}>
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>
          <span style={{ color: '#7c6dfa' }}>Portfolio</span><span style={{ color: '#fa6d8a' }}>.</span>
          <span style={{ color: '#6868aa' }}>admin</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.end}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 10, marginBottom: 4,
              fontSize: 14, fontWeight: 500, textDecoration: 'none',
              transition: 'all 0.2s',
              background: isActive ? 'rgba(124,109,250,0.15)' : 'transparent',
              color: isActive ? '#a89cfc' : '#6868aa',
              borderLeft: isActive ? '2px solid #7c6dfa' : '2px solid transparent',
            })}>
            <span>{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '16px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, fontSize: 14, color: '#6868aa', textDecoration: 'none', marginBottom: 4 }}>
          🌐 View Portfolio
        </NavLink>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '10px 14px', borderRadius: 10,
          background: 'none', border: 'none', fontSize: 14, color: '#fa6d8a', cursor: 'pointer',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(250,109,138,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >🚪 Logout</button>
      </div>
    </div>
  );
};

// ── Shared form modal ────────────────────────────────────────
const Modal = ({ title, onClose, onSave, children }) => (
  <div style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    backdropFilter: 'blur(8px)',
  }} onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={{
      background: '#0e0e1a', border: '1px solid rgba(124,109,250,0.2)',
      borderRadius: 24, width: '100%', maxWidth: 560, maxHeight: '85vh',
      overflow: 'auto', padding: '32px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 32, height: 32, color: '#eeeeff', cursor: 'pointer', fontSize: 16 }}>×</button>
      </div>
      {children}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={onClose} className="btn btn-ghost">Cancel</button>
        <button onClick={onSave} className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
);

const FG = ({ label, children }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    {children}
  </div>
);

// ── Overview ─────────────────────────────────────────────────
const Overview = ({ stats }) => (
  <div>
    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Dashboard Overview</h2>
    <p style={{ color: '#6868aa', marginBottom: 32 }}>Welcome back! Here's what's happening.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
      {[
        { label: 'Experience', val: stats.exp, icon: '💼', color: '#7c6dfa' },
        { label: 'Projects', val: stats.proj, icon: '🚀', color: '#fa6d8a' },
        { label: 'Skills', val: stats.skills, icon: '⚡', color: '#3de8a0' },
        { label: 'Messages', val: stats.msgs, icon: '💬', color: '#f9c74f' },
        { label: 'Unread', val: stats.unread, icon: '🔔', color: '#f9c74f' },
      ].map(s => (
        <div key={s.label} style={{
          background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: '20px 20px',
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: s.color }}>{s.val ?? '—'}</div>
          <div style={{ fontSize: 13, color: '#6868aa', marginTop: 4 }}>{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ── Profile Admin ─────────────────────────────────────────────
const ProfileAdmin = () => {
  const [p, setP] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    api.getProfile().then(r => setP(r.data.data || {})).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try { await api.updateProfile(p); toast.success('Profile updated!'); }
    catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('photo', file);
    try {
      const r = await api.uploadPhoto(fd);
      setP(prev => ({ ...prev, photo_url: r.data.photo_url }));
      toast.success('Photo uploaded!');
    } catch { toast.error('Upload failed'); }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 28 }}>Edit Profile</h2>

      {/* Photo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, padding: 24, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%', overflow: 'hidden',
          background: 'rgba(124,109,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, border: '2px solid rgba(124,109,250,0.3)',
        }}>
          {p.photo_url ? <img src={`http://localhost:5000${p.photo_url}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
        </div>
        <div>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Profile Photo</div>
          <input type="file" accept="image/*" ref={fileRef} onChange={uploadPhoto} style={{ display: 'none' }} />
          <button className="btn btn-outline btn-sm" onClick={() => fileRef.current.click()}>Upload Photo</button>
        </div>
      </div>

      <div className="form-row">
        <FG label="Full Name"><input value={p.name || ''} onChange={e => setP(v => ({ ...v, name: e.target.value }))} /></FG>
        <FG label="Title / Role"><input value={p.title || ''} onChange={e => setP(v => ({ ...v, title: e.target.value }))} /></FG>
      </div>
      <FG label="Summary"><textarea value={p.summary || ''} onChange={e => setP(v => ({ ...v, summary: e.target.value }))} rows={4} style={{ resize: 'vertical' }} /></FG>
      <div className="form-row">
        <FG label="Phone"><input value={p.phone || ''} onChange={e => setP(v => ({ ...v, phone: e.target.value }))} /></FG>
        <FG label="Email"><input value={p.email || ''} onChange={e => setP(v => ({ ...v, email: e.target.value }))} /></FG>
      </div>
      <div className="form-row">
        <FG label="LinkedIn URL"><input value={p.linkedin || ''} onChange={e => setP(v => ({ ...v, linkedin: e.target.value }))} /></FG>
        <FG label="GitHub URL"><input value={p.github || ''} onChange={e => setP(v => ({ ...v, github: e.target.value }))} /></FG>
      </div>
      <div className="form-row">
        <FG label="Location"><input value={p.location || ''} onChange={e => setP(v => ({ ...v, location: e.target.value }))} /></FG>
        <FG label="Available for Work">
          <select value={p.available ? '1' : '0'} onChange={e => setP(v => ({ ...v, available: e.target.value === '1' }))}>
            <option value="1">Yes – Available</option>
            <option value="0">No – Not Available</option>
          </select>
        </FG>
      </div>
      <button className="btn btn-primary" onClick={save} disabled={saving}>
        {saving ? 'Saving...' : '💾 Save Profile'}
      </button>
    </div>
  );
};

// ── Generic list admin ────────────────────────────────────────
const ListAdmin = ({ title, icon, fetchFn, createFn, updateFn, deleteFn, renderItem, renderForm }) => {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null); // null | {mode:'create'} | {mode:'edit', item}
  const [form, setForm] = useState({});

  const load = () => fetchFn().then(r => setItems(r.data.data || []));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm({}); setModal({ mode: 'create' }); };
  const openEdit = (item) => { setForm(item); setModal({ mode: 'edit', item }); };
  const closeModal = () => setModal(null);

  const save = async () => {
    try {
      if (modal.mode === 'create') await createFn(form);
      else await updateFn(modal.item.id, form);
      toast.success(`${modal.mode === 'create' ? 'Created' : 'Updated'} successfully!`);
      closeModal(); load();
    } catch { toast.error('Save failed'); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try { await deleteFn(id); toast.success('Deleted!'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700 }}>{icon} {title}</h2>
        <button className="btn btn-primary btn-sm" onClick={openCreate}>+ Add New</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: '18px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{ flex: 1 }}>{renderItem(item)}</div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {updateFn && <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}>✏️ Edit</button>}
              {deleteFn && <button className="btn btn-danger btn-sm" onClick={() => del(item.id)}>🗑️</button>}
            </div>
          </div>
        ))}
        {items.length === 0 && <div style={{ color: '#6868aa', textAlign: 'center', padding: 40 }}>No items yet. Add one!</div>}
      </div>

      {modal && (
        <Modal title={`${modal.mode === 'create' ? 'Add' : 'Edit'} ${title}`} onClose={closeModal} onSave={save}>
          {renderForm(form, setForm)}
        </Modal>
      )}
    </div>
  );
};

// ── Experience Admin ──────────────────────────────────────────
const ExperienceAdmin = () => (
  <ListAdmin
    title="Experience" icon="💼"
    fetchFn={api.getExperience}
    createFn={api.createExperience}
    updateFn={api.updateExperience}
    deleteFn={api.deleteExperience}
    renderItem={item => (
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{item.company} — <span style={{ color: '#7c6dfa' }}>{item.role}</span></div>
        <div style={{ fontSize: 13, color: '#6868aa', marginTop: 4 }}>{item.start_date} – {item.end_date || 'Present'} · {item.location}</div>
      </div>
    )}
    renderForm={(form, setForm) => (
      <>
        <div className="form-row">
          <FG label="Company"><input value={form.company || ''} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></FG>
          <FG label="Role"><input value={form.role || ''} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></FG>
        </div>
        <div className="form-row">
          <FG label="Start Date"><input value={form.start_date || ''} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} placeholder="Jan 2024" /></FG>
          <FG label="End Date"><input value={form.end_date || ''} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} placeholder="Dec 2024 or leave blank" /></FG>
        </div>
        <div className="form-row">
          <FG label="Location"><input value={form.location || ''} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></FG>
          <FG label="Currently Working?">
            <select value={form.is_current ? '1' : '0'} onChange={e => setForm(f => ({ ...f, is_current: e.target.value === '1' }))}>
              <option value="0">No</option><option value="1">Yes</option>
            </select>
          </FG>
        </div>
        <FG label="Bullet Points (one per line)">
          <textarea rows={5} value={(form.bullets || []).join('\n')}
            onChange={e => setForm(f => ({ ...f, bullets: e.target.value.split('\n') }))}
            style={{ resize: 'vertical' }} />
        </FG>
      </>
    )}
  />
);

// ── Projects Admin ────────────────────────────────────────────
const ProjectsAdmin = () => (
  <ListAdmin
    title="Projects" icon="🚀"
    fetchFn={api.getProjects}
    createFn={api.createProject}
    updateFn={api.updateProject}
    deleteFn={api.deleteProject}
    renderItem={item => (
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{item.title} {item.featured && <span style={{ fontSize: 11, color: '#f9c74f' }}>⭐</span>}</div>
        <div style={{ fontSize: 13, color: '#6868aa', marginTop: 4 }}>{(item.tech_stack || []).join(', ')}</div>
      </div>
    )}
    renderForm={(form, setForm) => (
      <>
        <FG label="Title"><input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></FG>
        <FG label="Description"><textarea rows={3} value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} /></FG>
        <FG label="Tech Stack (comma-separated)">
          <input value={(form.tech_stack || []).join(', ')} onChange={e => setForm(f => ({ ...f, tech_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} placeholder="React, Node.js, MongoDB" />
        </FG>
        <div className="form-row">
          <FG label="GitHub URL"><input value={form.github_url || ''} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))} /></FG>
          <FG label="Live URL"><input value={form.live_url || ''} onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))} /></FG>
        </div>
        <FG label="Featured?">
          <select value={form.featured ? '1' : '0'} onChange={e => setForm(f => ({ ...f, featured: e.target.value === '1' }))}>
            <option value="0">No</option><option value="1">Yes</option>
          </select>
        </FG>
      </>
    )}
  />
);

// ── Skills Admin ──────────────────────────────────────────────
const SkillsAdmin = () => (
  <ListAdmin
    title="Skills" icon="⚡"
    fetchFn={api.getSkills}
    createFn={api.createSkill}
    updateFn={api.updateSkill}
    deleteFn={api.deleteSkill}
    renderItem={item => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: '#6868aa', minWidth: 90 }}>{item.category}</span>
        <span style={{ fontWeight: 500 }}>{item.name}</span>
        <span style={{ fontSize: 12, color: '#7c6dfa' }}>{item.level}%</span>
      </div>
    )}
    renderForm={(form, setForm) => (
      <>
        <div className="form-row">
          <FG label="Category"><input value={form.category || ''} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Languages, Frameworks, Tools..." /></FG>
          <FG label="Skill Name"><input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></FG>
        </div>
        <div className="form-row">
          <FG label="Level (0–100)"><input type="number" min={0} max={100} value={form.level || 80} onChange={e => setForm(f => ({ ...f, level: parseInt(e.target.value) }))} /></FG>
          <FG label="Color">
            <select value={form.color || 'purple'} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}>
              <option value="purple">Purple</option>
              <option value="green">Green</option>
              <option value="pink">Pink</option>
              <option value="amber">Amber</option>
            </select>
          </FG>
        </div>
      </>
    )}
  />
);

// ── Education Admin ────────────────────────────────────────────
const EducationAdmin = () => (
  <ListAdmin
    title="Education" icon="🎓"
    fetchFn={api.getEducation}
    createFn={api.createEducation}
    updateFn={api.updateEducation}
    deleteFn={api.deleteEducation}
    renderItem={item => (
      <div>
        <div style={{ fontWeight: 600 }}>{item.institution}</div>
        <div style={{ fontSize: 13, color: '#6868aa', marginTop: 4 }}>{item.degree} – {item.field} · {item.score}</div>
        <div style={{ fontSize: 12, color: '#444466', marginTop: 2 }}>{item.start_date} – {item.end_date}</div>
      </div>
    )}
    renderForm={(form, setForm) => (
      <>
        <FG label="Institution"><input value={form.institution || ''} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))} /></FG>
        <div className="form-row">
          <FG label="Degree"><input value={form.degree || ''} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} placeholder="B.Tech" /></FG>
          <FG label="Field"><input value={form.field || ''} onChange={e => setForm(f => ({ ...f, field: e.target.value }))} placeholder="Computer Science" /></FG>
        </div>
        <div className="form-row">
          <FG label="Score/CGPA"><input value={form.score || ''} onChange={e => setForm(f => ({ ...f, score: e.target.value }))} placeholder="7.01 CGPA" /></FG>
          <FG label="Sort Order"><input type="number" value={form.sort_order || 0} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) }))} /></FG>
        </div>
        <div className="form-row">
          <FG label="Start Date"><input value={form.start_date || ''} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} placeholder="Sep 2021" /></FG>
          <FG label="End Date"><input value={form.end_date || ''} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} placeholder="Jun 2025" /></FG>
        </div>
      </>
    )}
  />
);

// ── Certifications Admin ───────────────────────────────────────
const CertificationsAdmin = () => (
  <ListAdmin
    title="Certifications" icon="🏆"
    fetchFn={api.getCertifications}
    createFn={api.createCertification}
    updateFn={null}
    deleteFn={api.deleteCertification}
    renderItem={item => (
      <div>
        <div style={{ fontWeight: 600 }}>{item.name}</div>
        <div style={{ fontSize: 13, color: '#6868aa', marginTop: 4 }}>{item.issuer} · {item.year}</div>
      </div>
    )}
    renderForm={(form, setForm) => (
      <>
        <FG label="Certificate Name"><input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></FG>
        <div className="form-row">
          <FG label="Issuer"><input value={form.issuer || ''} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} /></FG>
          <FG label="Year"><input value={form.year || ''} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2024" /></FG>
        </div>
        <FG label="Certificate URL (optional)"><input value={form.url || ''} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} /></FG>
      </>
    )}
  />
);

// ── Messages Admin ─────────────────────────────────────────────
const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => api.getMessages().then(r => setMessages(r.data.data || []));
  useEffect(() => { load(); }, []);

  const markRead = async (id) => { await api.markRead(id); load(); };
  const del = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await api.deleteMessage(id);
    setSelected(null); load(); toast.success('Deleted!');
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 28 }}>💬 Messages</h2>
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.5fr' : '1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map(msg => (
            <div key={msg.id}
              onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg.id); }}
              style={{
                background: selected?.id === msg.id ? 'rgba(124,109,250,0.1)' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${selected?.id === msg.id ? 'rgba(124,109,250,0.3)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12, padding: '14px 18px', cursor: 'pointer', transition: 'all 0.2s',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: msg.is_read ? 400 : 700, fontSize: 14 }}>{msg.sender_name}</div>
                {!msg.is_read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c6dfa', flexShrink: 0 }} />}
              </div>
              <div style={{ fontSize: 12, color: '#6868aa', marginTop: 2 }}>{msg.sender_email}</div>
              <div style={{ fontSize: 13, color: '#b0b0cc', marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.subject || msg.message}</div>
              <div style={{ fontSize: 11, color: '#444466', marginTop: 4 }}>{new Date(msg.created_at).toLocaleDateString()}</div>
            </div>
          ))}
          {messages.length === 0 && <div style={{ color: '#6868aa', textAlign: 'center', padding: 40 }}>No messages yet.</div>}
        </div>

        {selected && (
          <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{selected.sender_name}</div>
                <div style={{ fontSize: 13, color: '#7c6dfa', marginTop: 2 }}>{selected.sender_email}</div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => del(selected.id)}>🗑️ Delete</button>
            </div>
            {selected.subject && <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>{selected.subject}</div>}
            <div style={{ fontSize: 14, color: '#b0b0cc', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{selected.message}</div>
            <div style={{ fontSize: 11, color: '#444466', marginTop: 20 }}>Received: {new Date(selected.created_at).toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Admin Page ────────────────────────────────────────────
const Admin = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    Promise.all([
      api.getExperience(), api.getProjects(), api.getSkills(), api.getMessages(),
    ]).then(([exp, proj, skills, msgs]) => {
      const messages = msgs.data.data || [];
      setStats({
        exp: (exp.data.data || []).length,
        proj: (proj.data.data || []).length,
        skills: (skills.data.data || []).length,
        msgs: messages.length,
        unread: messages.filter(m => !m.is_read).length,
      });
    });
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#07070f' }}>
      <Sidebar unread={stats.unread} />
      <main style={{ flex: 1, padding: '40px 40px', overflowY: 'auto', maxWidth: 900 }}>
        <Routes>
          <Route index element={<Overview stats={stats} />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="certifications" element={<CertificationsAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
