const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize local JSON DB structure if missing
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ projects: [], certifications: [] }, null, 2));
}

// Helper functions for Database Reads/Writes
const getDB = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { projects: [], certifications: [] };
    }
};

const saveDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// ------------------------------------------------------------------
// GET APIs
// ------------------------------------------------------------------

// Fetch all projects
app.get('/api/projects', (req, res) => {
    try {
        const db = getDB();
        res.json(db.projects || []);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read projects database.' });
    }
});

// Fetch all certifications
app.get('/api/certifications', (req, res) => {
    try {
        const db = getDB();
        res.json(db.certifications || []);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read certifications database.' });
    }
});

// ------------------------------------------------------------------
// POST APIs (Admin Portal Endpoints)
// ------------------------------------------------------------------

// Add a new Project
app.post('/api/projects', (req, res) => {
    const { title, desc, tech, demoUrl, githubUrl, adminPassword } = req.body;

    // Security Password Check
    if (adminPassword !== 'Kitchu2006') {
        return res.status(401).json({ error: 'Unauthorized: Invalid Admin Password' });
    }

    if (!title || !desc || !tech) {
        return res.status(400).json({ error: 'Please provide Title, Description, and Tech stack.' });
    }

    try {
        const db = getDB();

        const newProject = {
            id: Date.now(),
            title,
            desc,
            tech,
            demoUrl: demoUrl || '#',
            githubUrl: githubUrl || '#'
        };

        if (!db.projects) db.projects = [];
        db.projects.unshift(newProject);
        saveDB(db);

        res.status(201).json({ message: 'Project added successfully!', project: newProject });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save new project.' });
    }
});

// Add a new Certification / Course
app.post('/api/certifications', (req, res) => {
    const { title, issuer, desc, credentialUrl, adminPassword } = req.body;

    // Security Password Check
    if (adminPassword !== 'Kitchu2006') {
        return res.status(401).json({ error: 'Unauthorized: Invalid Admin Password' });
    }

    if (!title || !issuer) {
        return res.status(400).json({ error: 'Please provide Title and Issuer/Platform.' });
    }

    try {
        const db = getDB();

        const newCertification = {
            id: Date.now(),
            title,
            issuer,
            desc: desc || '',
            credentialUrl: credentialUrl || '#'
        };

        if (!db.certifications) db.certifications = [];
        db.certifications.unshift(newCertification);
        saveDB(db);

        res.status(201).json({ message: 'Certification added successfully!', certification: newCertification });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save new certification.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin Portal: http://localhost:${PORT}/admin.html`);
});