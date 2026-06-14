const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const authCtrl = require('../controllers/authController');
const portCtrl = require('../controllers/portfolioController');

// ── Auth ──────────────────────────────────────────────
router.post('/auth/login', authCtrl.login);
router.get('/auth/verify', auth, authCtrl.verify);
router.put('/auth/password', auth, authCtrl.changePassword);

// ── Public Portfolio ──────────────────────────────────
router.get('/portfolio', portCtrl.getFullPortfolio);
router.get('/profile', portCtrl.getProfile);
router.get('/experience', portCtrl.getExperience);
router.get('/projects', portCtrl.getProjects);
router.get('/skills', portCtrl.getSkills);
router.get('/education', portCtrl.getEducation);
router.get('/certifications', portCtrl.getCertifications);

// ── Public Contact ────────────────────────────────────
router.post('/contact', portCtrl.sendMessage);

// ── Admin Protected ───────────────────────────────────
router.put('/profile', auth, portCtrl.updateProfile);
router.post('/profile/photo', auth, upload.single('photo'), portCtrl.uploadPhoto);

router.post('/experience', auth, portCtrl.createExperience);
router.put('/experience/:id', auth, portCtrl.updateExperience);
router.delete('/experience/:id', auth, portCtrl.deleteExperience);

router.post('/projects', auth, portCtrl.createProject);
router.put('/projects/:id', auth, portCtrl.updateProject);
router.delete('/projects/:id', auth, portCtrl.deleteProject);

router.post('/skills', auth, portCtrl.createSkill);
router.put('/skills/:id', auth, portCtrl.updateSkill);
router.delete('/skills/:id', auth, portCtrl.deleteSkill);

router.post('/education', auth, portCtrl.createEducation);
router.put('/education/:id', auth, portCtrl.updateEducation);
router.delete('/education/:id', auth, portCtrl.deleteEducation);

router.post('/certifications', auth, portCtrl.createCertification);
router.delete('/certifications/:id', auth, portCtrl.deleteCertification);

router.get('/messages', auth, portCtrl.getMessages);
router.put('/messages/:id/read', auth, portCtrl.markMessageRead);
router.delete('/messages/:id', auth, portCtrl.deleteMessage);

module.exports = router;
