import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const Hero = ({ profile }) => {
  const canvasRef = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 109, 250, ${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  const name = profile?.name || 'Pankaj ';
  const photoSrc = profile?.photo_url ? `http://localhost:5000${profile.photo_url}` : null;

  const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

  return (
    <section id="about" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 24px 60px' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>

          {/* Text */}
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3de8a0', boxShadow: '0 0 12px #3de8a0', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 13, color: '#3de8a0', fontWeight: 500, letterSpacing: 1 }}>
                {profile?.available ? 'Available for opportunities' : 'Currently occupied'}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="section-tag">Software Developer</motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: 'Syne, sans-serif', fontSize: 'clamp(48px, 7vw, 90px)',
              fontWeight: 800, letterSpacing: -4, lineHeight: 0.95, marginBottom: 20,
            }}>
              {name.split(' ')[0]}<br />
              <span style={{
                background: 'linear-gradient(135deg, #7c6dfa, #fa6d8a)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.div variants={fadeUp} style={{ fontSize: 20, color: '#b0b0cc', marginBottom: 24, minHeight: 32 }}>
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer', 2000,
                  'MERN Stack Engineer', 2000,
                  'Java Developer', 2000,
                  'Problem Solver', 2000,
                  'UI/UX Enthusiast', 2000,
                ]}
                wrapper="span" speed={50} repeat={Infinity}
              />
            </motion.div>

            <motion.p variants={fadeUp} style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(238,238,255,0.65)', maxWidth: 540, marginBottom: 36 }}>
              {profile?.summary || 'A determined software developer building innovative solutions with modern web technologies.'}
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              )}
              <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-ghost">
                Contact Me →
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 32, marginTop: 48 }}>
              {[['1+', 'Years Exp.'], ['2+', 'Projects Built'], ['5+', 'Technologies'], ['3', 'Certifications']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#eeeeff', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 12, color: '#6868aa', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative' }}>
              {/* Outer ring */}
              <div style={{
                width: 240, height: 240, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #7c6dfa, #fa6d8a, #3de8a0, #7c6dfa)',
                padding: 3, animation: 'spin 6s linear infinite',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: '#0e0e1a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {photoSrc ? (
                    <img src={photoSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{
                      fontFamily: 'Syne, sans-serif', fontSize: 64, fontWeight: 800,
                      background: 'linear-gradient(135deg, #7c6dfa, #fa6d8a)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      {name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
              </div>

              {/* Floating badges */}
              <div style={{
                position: 'absolute', top: 10, right: -20,
                background: 'rgba(14,14,26,0.9)', border: '1px solid rgba(124,109,250,0.3)',
                borderRadius: 12, padding: '8px 14px', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                animation: 'float 3s ease-in-out infinite',
              }}>
                <span style={{ fontSize: 16 }}>⚡</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>Open to work</span>
              </div>

              <div style={{
                position: 'absolute', bottom: 20, left: -30,
                background: 'rgba(14,14,26,0.9)', border: '1px solid rgba(61,232,160,0.3)',
                borderRadius: 12, padding: '8px 14px', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                animation: 'float 3.5s ease-in-out infinite 0.5s',
              }}>
                <span style={{ fontSize: 16 }}>🚀</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>MERN Stack</span>
              </div>
            </div>

            {/* Contact info pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
              {profile?.phone && (
                <a href={`tel:${profile.phone}`} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10, padding: '10px 16px', fontSize: 13, color: '#b0b0cc',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,109,250,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  📞 {profile.phone}
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10, padding: '10px 16px', fontSize: 13, color: '#b0b0cc',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,109,250,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  ✉️ {profile.email}
                </a>
              )}
              {profile?.location && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10, padding: '10px 16px', fontSize: 13, color: '#b0b0cc',
                }}>
                  📍 {profile.location}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @media (max-width: 768px) {
          section > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
