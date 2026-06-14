import React from 'react';

const Footer = ({ profile }) => (
  <footer style={{
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '40px 24px',
    textAlign: 'center',
  }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, letterSpacing: -1, marginBottom: 8 }}>
        <span style={{ color: '#7c6dfa' }}>{profile?.name?.split(' ')[0] || 'Pankaj'}</span>
        <span style={{ color: '#fa6d8a' }}>.</span>
      </div>
      <p style={{ fontSize: 13, color: '#6868aa', marginBottom: 16 }}>
        {profile?.title || 'Full-Stack Developer · MERN Stack · Java'}
      </p>
      <div style={{ fontSize: 12, color: '#444466' }}>
        Built with React · Node.js · Express · MySQL · ❤️ &nbsp;&nbsp;© {new Date().getFullYear()} {profile?.name || 'Pankaj Rana'}
      </div>
    </div>
  </footer>
);

export default Footer;
