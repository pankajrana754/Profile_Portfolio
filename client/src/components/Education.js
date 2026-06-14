import React from 'react';
import { motion } from 'framer-motion';

const Education = ({ education, certifications }) => {
  return (
    <section id="education" style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-tag">Background</div>
          <h2 className="section-title" style={{ marginBottom: 60 }}>
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {/* Education */}
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#a89cfc' }}>
              🎓 Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(education || []).map((edu, i) => (
                <motion.div key={edu.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 16, padding: '20px 24px', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,109,250,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{edu.institution}</div>
                      <div style={{ fontSize: 13, color: '#b0b0cc' }}>{edu.degree}{edu.field ? ` – ${edu.field}` : ''}</div>
                      <div style={{ fontSize: 12, color: '#6868aa', marginTop: 4 }}>{edu.start_date} – {edu.end_date}</div>
                    </div>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800,
                      color: '#7c6dfa', whiteSpace: 'nowrap', flexShrink: 0,
                    }}>{edu.score}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#3de8a0' }}>
              🏆 Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {(certifications || []).map((cert, i) => (
                <motion.div key={cert.id}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 14, padding: '16px 20px', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61,232,160,0.3)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(61,232,160,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>🎖️</div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{cert.name}</div>
                    <div style={{ fontSize: 12, color: '#6868aa', marginTop: 2 }}>
                      {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                    </div>
                  </div>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', color: '#3de8a0', fontSize: 13 }}>↗</a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#education > div > div:last-child{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
};

export default Education;
