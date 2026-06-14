import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
  0: { bg: 'rgba(124,109,250,0.08)', border: 'rgba(124,109,250,0.2)', accent: '#7c6dfa' },
  1: { bg: 'rgba(250,109,138,0.08)', border: 'rgba(250,109,138,0.2)', accent: '#fa6d8a' },
  2: { bg: 'rgba(61,232,160,0.08)', border: 'rgba(61,232,160,0.2)', accent: '#3de8a0' },
  3: { bg: 'rgba(249,199,79,0.08)', border: 'rgba(249,199,79,0.2)', accent: '#f9c74f' },
};

const Projects = ({ projects }) => {
  return (
    <section id="projects" style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-tag">My Work</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ fontSize: 16, color: '#b0b0cc', marginBottom: 56, maxWidth: 500 }}>
            A collection of projects I've built to solve real-world problems.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {(projects || []).map((proj, i) => {
            const c = colorMap[i % 4];
            return (
              <motion.div key={proj.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                style={{
                  position: 'relative', overflow: 'hidden',
                  background: c.bg, border: `1px solid ${c.border}`,
                  borderRadius: 24, padding: '32px 28px',
                  transition: 'box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4)`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Number watermark */}
                <div style={{
                  position: 'absolute', top: -10, right: 16,
                  fontFamily: 'Syne, sans-serif', fontSize: 100, fontWeight: 800,
                  color: c.accent, opacity: 0.06, lineHeight: 1, userSelect: 'none',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Featured badge */}
                {proj.featured && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    fontSize: 11, padding: '3px 10px', borderRadius: 20,
                    background: 'rgba(249,199,79,0.1)', color: '#f9c74f',
                    border: '1px solid rgba(249,199,79,0.2)',
                    marginBottom: 16,
                  }}>⭐ Featured</div>
                )}

                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700,
                  letterSpacing: -0.5, marginBottom: 12, color: '#eeeeff',
                }}>{proj.title}</h3>

                <p style={{ fontSize: 14, color: '#b0b0cc', lineHeight: 1.75, marginBottom: 20 }}>{proj.description}</p>

                {/* Tech stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {(proj.tech_stack || []).map(tech => (
                    <span key={tech} style={{
                      fontSize: 12, padding: '4px 12px', borderRadius: 6,
                      background: 'rgba(255,255,255,0.05)', color: '#b0b0cc',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>{tech}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: 10 }}>
                  {proj.github_url && (
                    <a href={proj.github_url} target="_blank" rel="noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, padding: '7px 16px', borderRadius: 40,
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#eeeeff', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = c.accent}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      Code
                    </a>
                  )}
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, padding: '7px 16px', borderRadius: 40,
                        background: c.bg, border: `1px solid ${c.border}`,
                        color: c.accent, transition: 'all 0.2s',
                      }}
                    >
                      ↗ Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
