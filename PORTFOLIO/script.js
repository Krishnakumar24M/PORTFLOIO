document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. INITIALIZE LUCIDE ICONS
    // -------------------------------------------------------------
    if (window.lucide) {
        lucide.createIcons();
    }

    // -------------------------------------------------------------
    // 2. CUSTOM INTERACTIVE GLOW CURSOR
    // -------------------------------------------------------------
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const attachCursorHover = () => {
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .tilt-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    };
    attachCursorHover();

    // -------------------------------------------------------------
    // 3. TYPEWRITER ANIMATION IN HERO SECTION
    // -------------------------------------------------------------
    const taglineElement = document.querySelector('#about p');
    if (taglineElement) {
        const phrases = [
            "Data Science student specializing in machine learning pipelines.",
            "Passionate about building predictive models & AI architectures.",
            "Turning complex raw datasets into actionable insights."
        ];
        
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.innerHTML = '&nbsp;';

        const typeEffect = () => {
            const currentPhrase = phrases[phraseIdx];
            
            if (isDeleting) {
                charIdx--;
            } else {
                charIdx++;
            }

            taglineElement.textContent = currentPhrase.substring(0, charIdx);
            taglineElement.appendChild(cursorSpan);

            let typingSpeed = isDeleting ? 30 : 60;

            if (!isDeleting && charIdx === currentPhrase.length) {
                typingSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(typeEffect, typingSpeed);
        };

        typeEffect();
    }

    // -------------------------------------------------------------
    // 4. THREE.JS 3D CONSTELLATION & WIREFRAME CORE
    // -------------------------------------------------------------
    const canvas = document.getElementById('webgl-bg');
    if (canvas && window.THREE) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const knotGeometry = new THREE.TorusKnotGeometry(1.1, 0.35, 100, 16);
        const knotMaterial = new THREE.MeshBasicMaterial({
            color: 0x0284c7,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
        scene.add(knotMesh);

        const particleCount = 800;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 8;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.018,
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.7
        });

        const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleSystem);

        let targetX = 0;
        let targetY = 0;

        window.addEventListener('mousemove', (e) => {
            targetX = (e.clientX - window.innerWidth / 2) * 0.0008;
            targetY = (e.clientY - window.innerHeight / 2) * 0.0008;
        });

        const clock = new THREE.Clock();

        const animate3D = () => {
            const elapsedTime = clock.getElapsedTime();

            knotMesh.rotation.y = elapsedTime * 0.15 + targetX * 1.2;
            knotMesh.rotation.x = elapsedTime * 0.1 + targetY * 1.2;
            
            particleSystem.rotation.y = -elapsedTime * 0.04;
            particleSystem.rotation.x = elapsedTime * 0.02;

            renderer.render(scene, camera);
            requestAnimationFrame(animate3D);
        };

        animate3D();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    // -------------------------------------------------------------
    // 5. TRUE 3D CARD TILT EFFECT
    // -------------------------------------------------------------
    const apply3DTilt = (card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    };

    document.querySelectorAll('.tilt-card').forEach(card => apply3DTilt(card));

    // -------------------------------------------------------------
    // 6. SCROLL REVEAL OBSERVER
    // -------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // -------------------------------------------------------------
    // 7. DYNAMIC PROJECTS ENGINE (FETCH FROM ADMIN / API)
    // -------------------------------------------------------------
    const projectsGrid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');

    const createProjectCard = (project) => {
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        const tagsHtml = project.tech
            .split(',')
            .map(tech => `<span class="px-2.5 py-1 bg-slate-800/80 text-slate-300 text-xs rounded-md border border-slate-700/50">${tech.trim()}</span>`)
            .join('');

        const card = document.createElement('div');
        card.className = "tilt-card bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden group flex flex-col backdrop-blur-md reveal active";
        card.innerHTML = `
            <div class="tilt-card-content p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="h-44 bg-slate-800/80 rounded-lg relative flex items-center justify-center mb-2 overflow-hidden border border-slate-800">
                    <i data-lucide="folder-git-2" class="w-12 h-12 text-slate-500 group-hover:scale-125 group-hover:text-brand-500 transition duration-500"></i>
                </div>
                <div class="space-y-2 tilt-pop">
                    <h3 class="text-xl font-semibold text-white group-hover:text-brand-500 transition">${project.title}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">${project.desc}</p>
                </div>
                <div class="space-y-4 tilt-pop">
                    <div class="flex flex-wrap gap-2">${tagsHtml}</div>
                    <div class="flex items-center justify-between text-sm pt-3 border-t border-slate-800/80">
                        <a href="${project.demoUrl}" target="_blank" class="text-brand-500 hover:underline flex items-center gap-1 font-medium">Demo <i data-lucide="external-link" class="w-3.5 h-3.5"></i></a>
                        <a href="${project.githubUrl}" target="_blank" class="text-slate-400 hover:text-white flex items-center gap-1">Source <i data-lucide="github" class="w-3.5 h-3.5"></i></a>
                    </div>
                </div>
            </div>
        `;

        apply3DTilt(card);
        projectsGrid.appendChild(card);
        
        if (window.lucide) {
            lucide.createIcons();
        }
        attachCursorHover();
    };

    const loadProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const apiProjects = await res.json();
                if (apiProjects.length > 0) {
                    apiProjects.forEach(proj => createProjectCard(proj));
                }
            } else {
                throw new Error('API server offline');
            }
        } catch (err) {
            const localProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
            localProjects.forEach(proj => createProjectCard(proj));
        }
    };

    loadProjects();

    // -------------------------------------------------------------
    // 8. DYNAMIC CERTIFICATIONS ENGINE (FETCH FROM ADMIN / API)
    // -------------------------------------------------------------
    const certsGrid = document.getElementById('certificationsGrid');

    const createCertCard = (cert) => {
        if (!certsGrid) return;

        const card = document.createElement('div');
        card.className = "tilt-card bg-slate-900/60 border border-slate-800 p-6 rounded-xl flex items-start gap-4 backdrop-blur-md reveal active";
        card.innerHTML = `
            <div class="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                <i data-lucide="award" class="w-6 h-6"></i>
            </div>
            <div class="space-y-1">
                <h3 class="text-lg font-semibold text-white">${cert.title}</h3>
                <p class="text-xs text-brand-500 font-medium">${cert.issuer}</p>
                <p class="text-xs text-slate-400 leading-relaxed pt-1">${cert.desc}</p>
                ${cert.credentialUrl && cert.credentialUrl !== '#' ? `<a href="${cert.credentialUrl}" target="_blank" class="inline-block pt-2 text-xs text-brand-500 hover:underline">View Credential &rarr;</a>` : ''}
            </div>
        `;

        apply3DTilt(card);
        certsGrid.appendChild(card);

        if (window.lucide) {
            lucide.createIcons();
        }
        attachCursorHover();
    };

    const loadCertifications = async () => {
        try {
            const res = await fetch('/api/certifications');
            if (res.ok) {
                const apiCerts = await res.json();
                apiCerts.forEach(cert => createCertCard(cert));
            }
        } catch (err) {
            console.log('Certifications backend server offline.');
        }
    };

    loadCertifications();

    // -------------------------------------------------------------
    // 9. CONTACT FORM HANDLER
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
        });
    }
});