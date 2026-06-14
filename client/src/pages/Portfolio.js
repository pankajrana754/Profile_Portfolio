import React, { useEffect, useState } from 'react';
import { getPortfolio } from '../utils/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Portfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolio()
      .then(res => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#07070f', flexDirection: 'column', gap: 16 }}>
      <div style={{
        width: 60, height: 60, borderRadius: '50%',
        background: 'conic-gradient(#7c6dfa, #fa6d8a, #3de8a0, #7c6dfa)',
        animation: 'spin 1s linear infinite',
        padding: 3,
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#07070f' }} />
      </div>
      <div style={{ color: '#6868aa', fontSize: 14 }}>Loading portfolio...</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Background effects */}
      <div className="bg-effects">
        <div className="bg-grid" />
        <div className="bg-orb orb1" />
        <div className="bg-orb orb2" />
        <div className="bg-orb orb3" />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar profile={data?.profile} />
        <Hero profile={data?.profile} />
        <Experience experience={data?.experience} />
        <Projects projects={data?.projects} />
        <Skills skills={data?.skills} />
        <Education education={data?.education} certifications={data?.certifications} />
        <Contact profile={data?.profile} />
        <Footer profile={data?.profile} />
      </div>
    </div>
  );
};

export default Portfolio;
