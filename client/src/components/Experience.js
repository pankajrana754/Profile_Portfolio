import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ experience }) => {
  return (
    <section id="experience" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-tag">Work History</div>
          <h2 className="section-title" style={{ marginBottom: 60 }}>
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 0, top: 12, bottom: 0,
            width: 1, background: 'linear-gradient(180deg, #7c6dfa, rgba(124,109,250,0.1))',
          }} />

          {(experience || []).map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ position: 'relative', marginBottom: 48 }}>

              {/* Dot */}
              <div style={{
                position: 'absolute', left: -37, top: 8,
                width: 12, height: 12, borderRadius: '50%',
                background: exp.is_current ? '#3de8a0' : '#7c6dfa',
                boxShadow: `0 0 16px ${exp.is_current ? '#3de8a0' : '#7c6dfa'}`,
                border: '2px solid #07070f',
              }} />

              <div style={{
                background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20, padding: '28px 32px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,109,250,0.3)'; e.currentTarget.style.background = 'rgba(124,109,250,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>{exp.company}</h3>
                    <div style={{ fontSize: 14, color: '#7c6dfa', fontWeight: 500 }}>{exp.role}</div>
                    {exp.location && <div style={{ fontSize: 13, color: '#6868aa', marginTop: 2 }}>📍 {exp.location}</div>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <div style={{
                      fontSize: 12, padding: '4px 14px', borderRadius: 40,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      color: '#b0b0cc', whiteSpace: 'nowrap',
                    }}>
                      {exp.start_date} – {exp.end_date || 'Present'}
                    </div>
                    {exp.is_current && (
                      <span style={{
                        fontSize: 11, padding: '2px 10px', borderRadius: 40,
                        background: 'rgba(61,232,160,0.1)', color: '#3de8a0',
                        border: '1px solid rgba(61,232,160,0.2)',
                      }}>● Current</span>
                    )}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', marginTop: 16 }}>
                  {(exp.bullets || []).map((b, j) => (
                    <li key={j} style={{
                      display: 'flex', gap: 10, padding: '6px 0',
                      fontSize: 14, color: 'rgba(238,238,255,0.7)', lineHeight: 1.7,
                    }}>
                      <span style={{ color: '#7c6dfa', flexShrink: 0, marginTop: 2 }}>▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
