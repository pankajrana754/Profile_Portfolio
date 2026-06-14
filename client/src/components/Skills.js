import React from 'react';
import { motion } from 'framer-motion';

const colorStyles = {
  purple: { bg: 'rgba(124,109,250,0.1)', text: '#a89cfc', border: 'rgba(124,109,250,0.2)' },
  green:  { bg: 'rgba(61,232,160,0.1)',  text: '#3de8a0', border: 'rgba(61,232,160,0.2)'  },
  pink:   { bg: 'rgba(250,109,138,0.1)', text: '#fa6d8a', border: 'rgba(250,109,138,0.2)' },
  amber:  { bg: 'rgba(249,199,79,0.1)',  text: '#f9c74f', border: 'rgba(249,199,79,0.2)'  },
};

const Skills = ({ skills }) => {
  const grouped = (skills || []).reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-tag">Capabilities</div>
          <h2 className="section-title" style={{ marginBottom: 60 }}>
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {Object.entries(grouped).map(([category, items], ci) => (
            <motion.div key={category}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: ci * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20, padding: '24px 28px',
              }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#6868aa', marginBottom: 18 }}>
                {category}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {items.map((skill, si) => {
                  const c = colorStyles[skill.color] || colorStyles.purple;
                  return (
                    <motion.div key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: si * 0.05 }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      style={{
                        padding: '8px 18px', borderRadius: 10,
                        background: c.bg, color: c.text, border: `1px solid ${c.border}`,
                        fontSize: 14, fontWeight: 500, cursor: 'default',
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>{skill.level}%</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bars for skills with levels */}
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.filter(s => s.level).slice(0, 4).map(skill => {
                  const c = colorStyles[skill.color] || colorStyles.purple;
                  return (
                    <div key={skill.id + '_bar'}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6868aa', marginBottom: 4 }}>
                        <span>{skill.name}</span><span>{skill.level}%</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                          style={{ height: '100%', background: c.text, borderRadius: 4 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
