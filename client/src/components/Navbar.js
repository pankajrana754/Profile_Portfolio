import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ profile }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = ['About','Experience','Projects','Skills','Education','Contact'];

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); }
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(7,7,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(124,109,250,0.1)' : 'none',
      transition: 'all 0.3s',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, letterSpacing: -1 }}>
          <span style={{ color: '#7c6dfa' }}>{profile?.name?.split(' ')[0] || 'Portfolio'}</span>
          <span style={{ color: '#fa6d8a' }}>.</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {nav.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              style={{
                background: 'none', border: 'none', color: '#b0b0cc', fontSize: 14, fontWeight: 500,
                padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.target.style.color = '#eeeeff'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.target.style.color = '#b0b0cc'; e.target.style.background = 'none'; }}
            >{item}</button>
          ))}
          {isAdmin ? (
            <Link to="/admin" style={{
              marginLeft: 8, padding: '8px 18px', borderRadius: 40,
              background: 'linear-gradient(135deg, #7c6dfa, #5a4de8)',
              color: '#fff', fontSize: 13, fontWeight: 500,
              boxShadow: '0 4px 16px rgba(124,109,250,0.3)',
            }}>Admin</Link>
          ) : (
            <Link to="/login" style={{ marginLeft: 8 }} className="btn btn-ghost btn-sm">Login</Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} style={{
          display: 'none', background: 'none', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: '8px 10px', color: '#eeeeff',
        }} className="mobile-menu-btn">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          background: 'rgba(7,7,15,0.98)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 24, zIndex: 99,
        }}>
          {nav.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              style={{
                background: 'none', border: 'none', color: '#eeeeff',
                fontSize: 28, fontWeight: 700, fontFamily: 'Syne, sans-serif',
                cursor: 'pointer', letterSpacing: -1,
              }}
            >{item}</button>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-primary" style={{ marginTop: 8 }}>Login</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
