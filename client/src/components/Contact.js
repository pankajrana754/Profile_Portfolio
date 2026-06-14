import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { sendMessage } from '../utils/api';

const Contact = ({ profile }) => {
  const [form, setForm] = useState({ sender_name: '', sender_email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMessage(form);
      toast.success('Message sent! I\'ll get back to you soon 🚀');
      setForm({ sender_name: '', sender_email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ color: '#b0b0cc', marginBottom: 60, maxWidth: 480 }}>
            Have a project in mind or want to collaborate? Drop a message and I'll get back to you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48 }}>
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Contact Info</h3>
              {[
                { icon: '📞', label: 'Phone', value: profile?.phone, href: `tel:${profile?.phone}` },
                { icon: '✉️', label: 'Email', value: profile?.email, href: `mailto:${profile?.email}` },
                { icon: '📍', label: 'Location', value: profile?.location },
              ].map(item => item.value && (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'rgba(124,109,250,0.1)', border: '1px solid rgba(124,109,250,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: '#6868aa', marginBottom: 2 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 15, color: '#eeeeff', textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.color = '#7c6dfa'}
                        onMouseLeave={e => e.target.style.color = '#eeeeff'}
                      >{item.value}</a>
                    ) : (
                      <div style={{ fontSize: 15 }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div style={{ fontSize: 13, color: '#6868aa', marginBottom: 16 }}>Find me on</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { href: profile?.github, icon: '⌥', label: 'GitHub' },
                  { href: profile?.linkedin, icon: '💼', label: 'LinkedIn' },
                ].filter(s => s.href).map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12, fontSize: 14, color: '#b0b0cc', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,109,250,0.4)'; e.currentTarget.style.color = '#eeeeff'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#b0b0cc'; }}
                  >{s.icon} {s.label}</a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 24, padding: '36px',
            }}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                <div>
                  <label className="form-label">Your Name</label>
                  <input value={form.sender_name} onChange={e => setForm(f => ({ ...f, sender_name: e.target.value }))}
                    placeholder="John Doe" required />
                </div>
                <div>
                  <label className="form-label">Your Email</label>
                  <input type="email" value={form.sender_email} onChange={e => setForm(f => ({ ...f, sender_email: e.target.value }))}
                    placeholder="john@example.com" required />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label className="form-label">Subject</label>
                <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="Project collaboration..." />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label className="form-label">Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..." rows={5} required
                  style={{ resize: 'vertical', minHeight: 120 }} />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} /> Sending...</> : '🚀 Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#contact>div>div:last-child{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
};

export default Contact;
