# 🌐 Krishna Kumar M – 3D Interactive Portfolio

> A modern, responsive, and interactive developer portfolio built using **HTML, CSS, JavaScript, Tailwind CSS, Three.js, Node.js, and Express.js**. The portfolio showcases projects, certifications, skills, experience, and includes an **Admin Dashboard** for dynamically managing content.

---

## 🚀 Live Preview

> Replace these links with your own after deployment.

- 🌍 Portfolio: `https://your-portfolio-url.com`
- 🔐 Admin Panel: `https://your-portfolio-url.com/admin.html`

---

# 📸 Preview

<img width="100%" alt="Portfolio Preview" src="assets/preview.png">

> *(Replace with your own screenshot if available.)*

---

# ✨ Features

## 🎨 Frontend

- Modern responsive UI
- Tailwind CSS design
- Three.js animated background
- Smooth scrolling
- Dark theme
- Mobile-friendly layout
- Animated reveal effects
- Professional portfolio sections

---

## 📂 Portfolio Sections

- Hero Section
- About Me
- Experience
- Projects
- Skills
- Certifications
- Contact

---

## ⚙ Backend

Built using **Node.js + Express.js**

Features include:

- REST API
- Dynamic Project Management
- Dynamic Certification Management
- Local JSON Database
- CORS Enabled
- Static File Hosting

---

## 🔐 Admin Dashboard

The project contains a dedicated Admin Panel (`admin.html`) that allows you to:

- ➕ Add Projects
- ➕ Add Certifications
- Store data into `db.json`
- Password Protected

---

# 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Tailwind CSS
- Three.js
- Lucide Icons

### Backend

- Node.js
- Express.js
- CORS

### Database

- JSON File Storage (`db.json`)

---

# 📁 Project Structure

```
PORTFOLIO/
│
├── index.html              # Main Portfolio
├── admin.html              # Admin Dashboard
├── script.js               # Frontend Logic
├── style.css               # Styling
├── server.js               # Express Server
├── db.json                 # Local Database
├── projects.json           # Project Data
├── resume.pdf              # Resume
└── README.md
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/portfolio.git
```

---

## 2. Navigate

```bash
cd portfolio
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Server

```bash
node server.js
```

or

```bash
npm start
```

---

Server runs at

```
http://localhost:3000
```

---

# 📡 API Endpoints

## Get Projects

```
GET /api/projects
```

---

## Add Project

```
POST /api/projects
```

Body

```json
{
  "title": "Portfolio Website",
  "desc": "Modern portfolio website",
  "tech": "HTML, CSS, JavaScript",
  "demoUrl": "https://demo.com",
  "githubUrl": "https://github.com/username/project",
  "adminPassword": "YOUR_ADMIN_PASSWORD"
}
```

---

## Get Certifications

```
GET /api/certifications
```

---

## Add Certification

```
POST /api/certifications
```

Body

```json
{
  "title": "AWS Cloud Practitioner",
  "issuer": "Amazon",
  "desc": "Cloud Certification",
  "credentialUrl": "https://verify-link.com",
  "adminPassword": "YOUR_ADMIN_PASSWORD"
}
```

---

# 📂 Database

The application stores data inside

```
db.json
```

Example

```json
{
  "projects": [],
  "certifications": []
}
```

No external database is required.

---

# 🎯 Customization

You can easily update:

- Name
- About Section
- Skills
- Experience
- Resume
- Contact Details
- Social Links
- Theme Colors
- Three.js Background
- Projects
- Certifications

---

# 🔒 Security Note

The current project uses a hardcoded admin password in the backend for authentication.

For production deployments, consider:

- Using environment variables (`.env`)
- Hashing passwords with bcrypt
- JWT authentication
- Database-backed user management

---

# 📱 Responsive Design

Works seamlessly on:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📟 Tablet

---

# 🚀 Future Improvements

- User authentication
- MongoDB integration
- Image uploads
- Admin login system
- Project editing & deletion
- Certification editing & deletion
- Contact form email integration
- Blog section
- Visitor analytics
- Dark/Light mode toggle
- Deployment with Docker

---

# 📄 Resume

Your resume is included as:

```
resume.pdf
```

You can replace it anytime with your latest version.

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

📢 Share it with others

---

# 📧 Contact

**Krishna Kumar M**

- 💼 Portfolio: *Add your deployed URL*
- 📧 Email: *your-email@example.com*
- 💻 GitHub: https://github.com/yourusername
- 🔗 LinkedIn: https://linkedin.com/in/yourusername

---

# 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Krishna Kumar M

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software
and associated documentation files...
```

---

## ⭐ If you like this project, don't forget to give it a Star!
