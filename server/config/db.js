const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

async function initDB() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL connected successfully');

    // Create DB if not exists
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'portfolio_db'}\``);
    await conn.query(`USE \`${process.env.DB_NAME || 'portfolio_db'}\``);

    // Admin table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Profile table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL DEFAULT 'Pankaj Rana',
        title VARCHAR(255) DEFAULT 'Full-Stack Developer · MERN Stack · Java',
        summary TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        linkedin VARCHAR(255),
        github VARCHAR(255),
        location VARCHAR(255),
        photo_url VARCHAR(500),
        available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Experience table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS experience (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        start_date VARCHAR(50),
        end_date VARCHAR(50),
        is_current BOOLEAN DEFAULT FALSE,
        bullets JSON,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Projects table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        tech_stack JSON,
        github_url VARCHAR(500),
        live_url VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Skills table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        level INT DEFAULT 80,
        color VARCHAR(20) DEFAULT 'purple',
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Education table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        institution VARCHAR(255) NOT NULL,
        degree VARCHAR(255),
        field VARCHAR(255),
        score VARCHAR(50),
        start_date VARCHAR(50),
        end_date VARCHAR(50),
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Certifications table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS certifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        issuer VARCHAR(255),
        year VARCHAR(10),
        url VARCHAR(500),
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Messages / Contact table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_name VARCHAR(255) NOT NULL,
        sender_email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default data if empty
    const [profileRows] = await conn.query('SELECT id FROM profile LIMIT 1');
    if (profileRows.length === 0) {
      await seedDefaultData(conn);
    }

    conn.release();
    console.log('✅ Database tables initialized');
  } catch (err) {
    console.error('❌ DB Init Error:', err.message);
    process.exit(1);
  }
}

async function seedDefaultData(conn) {
  const bcrypt = require('bcryptjs');
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@1234', 12);

  await conn.query(
    'INSERT IGNORE INTO admin (email, password) VALUES (?, ?)',
    [process.env.ADMIN_EMAIL || 'pankajrana00799@gmail.com', hash]
  );

  await conn.query(`
    INSERT INTO profile (name, title, summary, phone, email, linkedin, github, location, available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'Pankaj Rana',
      'Full-Stack Developer · MERN Stack · Java',
      'A determined and knowledgeable software developer who thrives in creating innovative solutions and architecting robust software applications. I bring fresh perspectives and an eagerness to collaborate with diverse teams, ensuring seamless integration of ideas and technologies.',
      '+91 9372019278',
      'pankajrana00799@gmail.com',
      'https://linkedin.com/in/pankajrana75',
      'https://github.com/pankajrana754',
      'Bhubaneswar, India',
      true
    ]
  );

  await conn.query(`
    INSERT INTO experience (company, role, location, start_date, end_date, is_current, bullets, sort_order) VALUES
    (?, ?, ?, ?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'Infosys Ltd.', 'Software Developer Intern', 'Bhubaneswar, India', 'Jul 2025', 'Present', true,
      JSON.stringify(['Focusing on core Java programming and Data Structures & Algorithms (DSA).','Participating in training and real-time project tasks involving problem-solving and backend development.','Applying MERN stack knowledge to strengthen full-stack development skills.','Collaborating in Agile environment to build scalable software solutions.','Hands-on experience in debugging, Git version control, and enterprise-level engineering.']),
      0,
      'Veishno Technology', 'Frontend Developer', 'Remote', 'Jun 2024', 'Nov 2024', false,
      JSON.stringify(['Collaborated with designers to implement website layouts using HTML, CSS, JavaScript.','Developed responsive design skills and version control experience with Git.','Participated in team meetings to discuss project progress and ideas.']),
      1
    ]
  );

  await conn.query(`
    INSERT INTO projects (title, description, tech_stack, featured, sort_order) VALUES
    (?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?)`,
    [
      'Learning Management System',
      'A platform enabling teachers to share materials, track progress, and manage assessments. Features include course creation, progress tracking, and student assessments.',
      JSON.stringify(['React.js','Node.js','Express.js','MongoDB','HTML5','CSS']),
      true, 0,
      'E-Commerce Platform',
      'Full-stack e-commerce solution allowing individuals and businesses to buy and sell goods or services over the internet with secure payment integration.',
      JSON.stringify(['React.js','Node.js','JavaScript','HTML','CSS']),
      true, 1
    ]
  );

  const skills = [
    ['Languages','Java',90,'purple',0],['Languages','JavaScript',88,'purple',1],['Languages','HTML5',92,'purple',2],
    ['Languages','CSS3',88,'purple',3],['Languages','MySQL',75,'purple',4],
    ['Frameworks','React.js',85,'green',0],['Frameworks','Node.js',82,'green',1],['Frameworks','Express.js',80,'green',2],['Frameworks','MongoDB',78,'green',3],
    ['Tools','Git',88,'pink',0],['Tools','GitHub',88,'pink',1],['Tools','VS Code',90,'pink',2],['Tools','Postman',80,'pink',3],['Tools','Eclipse',75,'pink',4],['Tools','Maven',72,'pink',5],
    ['Concepts','DSA',75,'amber',0],['Concepts','OOP',85,'amber',1],['Concepts','REST APIs',82,'amber',2],['Concepts','Agile',78,'amber',3],
  ];
  for (const [category, name, level, color, sort_order] of skills) {
    await conn.query('INSERT INTO skills (category, name, level, color, sort_order) VALUES (?,?,?,?,?)', [category, name, level, color, sort_order]);
  }

  await conn.query(`
    INSERT INTO education (institution, degree, field, score, start_date, end_date, sort_order) VALUES
    (?,?,?,?,?,?,?),(?,?,?,?,?,?,?),(?,?,?,?,?,?,?)`,
    [
      'Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal','B.Tech','Computer Science','7.01 CGPA','Sep 2021','Jun 2025',0,
      'RLSY College, Jhumri Telaiya, Jharkhand','Class XII','Science (PCM)','70%','May 2019','Jun 2021',1,
      'CH +2 High School, Jhumri Telaiya, Jharkhand','Class X','Schooling','83.89%','Jun 2018','Jul 2019',2
    ]
  );

  await conn.query(`
    INSERT INTO certifications (name, issuer, year, sort_order) VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?)`,
    [
      'NPTEL Certificate', 'IIT Kharagpur', '2024', 0,
      'Programming Competition - Java', 'College', '2023', 1,
      'Web Development Certificate', 'AICTE', '2024', 2
    ]
  );

  console.log('✅ Default data seeded');
}

module.exports = { pool, initDB };
