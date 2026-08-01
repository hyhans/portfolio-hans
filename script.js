// =========================================
// PREMIUM UX JAVASCRIPT (INSTANT NAVIGATION)
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Transitions (In) - Instantly Loaded
    document.body.classList.add('page-transition', 'loaded');

    // 2. Theme Switcher (Light / Dark Mode)
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                // Switch to Dark
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
                if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
            } else {
                // Switch to Light
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
                if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
            }
        });
    }

    // 3. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;
        
        // Track mouse position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows instantly using hardware acceleration
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        // Animate outline with easing
        const animateCursor = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX = outlineX + (distX * 0.2); // easing factor
            outlineY = outlineY + (distY * 0.2);
            
            // Outline follows with easing using hardware acceleration
            cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effect for clickable elements
        const clickables = document.querySelectorAll('a, button, .skill-card, .service-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 4. 3D Tilt Effect on Cards
    const tiltElements = document.querySelectorAll('.skill-card-wrapper, .service-card-wrapper');
    tiltElements.forEach(el => {
        const card = el.querySelector('.glass');
        if(!card) return;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
            card.style.zIndex = '10';
        });
        
        el.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
            card.style.zIndex = '1';
        });
    });

    // 6. Magnetic Buttons Effect
    const magnets = document.querySelectorAll('.btn, .social-icon');
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', function(e) {
            const position = magnet.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            magnet.style.transition = 'none';
        });
        
        magnet.addEventListener('mouseleave', function() {
            magnet.style.transform = 'translate(0px, 0px)';
            magnet.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // 7. Initialize Particles.js
    function initParticles(theme) {
        if(typeof particlesJS === 'undefined') return;
        
        const isLight = theme === 'light';
        const pColor = isLight ? '#3B82F6' : '#00F0FF';
        const lColor = isLight ? '#94A3B8' : '#ffffff';
        
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": pColor },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": lColor,
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.4 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    initParticles(savedTheme);

    // 8. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 9. Custom Smooth Scrolling for Hash links
    function smoothScrollTo(targetElement, duration = 800) {
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition);
            }
        }
        if (distance !== 0) requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') {
                e.preventDefault();
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                smoothScrollTo(targetElement, 1000);
            }
        });
    });

    // 10. Modal / Popup Logic
    const modal = document.getElementById('contactModal');
    const btnCollab = document.getElementById('btn-collab');
    const closeBtn = document.getElementById('closeModal');
    const orderBtns = document.querySelectorAll('.order-btn');

    if(btnCollab && modal) {
        btnCollab.addEventListener('click', () => modal.classList.add('active'));
    }

    if (modal) {
        orderBtns.forEach(btn => {
            btn.addEventListener('click', () => modal.classList.add('active'));
        });
    }

    const closeModal = () => { if(modal) modal.classList.remove('active'); };
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // 11. Handle Form Submission
    const form = document.getElementById('projectForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Message Sent! ✓';
            submitBtn.style.backgroundColor = '#10B981';
            submitBtn.style.color = '#fff';
            submitBtn.style.borderColor = '#10B981';
            
            setTimeout(() => {
                form.reset();
                closeModal();
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style = '';
                }, 500);
            }, 1500);
        });
    }

    // 12. Handle Skill Progress Bars Animations
    const skillsSection = document.querySelector('.skills-grid');
    if(skillsSection) {
        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                if(targetWidth) {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    bar.style.width = targetWidth;
                }
            });
        }, 300);
    }
});


// =========================================
// MASTERPIECE GLOBAL LOGIC
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const loadingBar = document.querySelector('.loading-bar-fill');
    
    if (preloader && preloaderText && loadingBar) {
        if (sessionStorage.getItem('siteLoaded')) {
            preloader.style.display = 'none';
        } else {
            let loadProgress = 0;
            const loadInterval = setInterval(() => {
                loadProgress += Math.floor(Math.random() * 15) + 5;
                if (loadProgress > 100) loadProgress = 100;
                
                preloaderText.innerText = loadProgress + '%';
                preloaderText.setAttribute('data-text', loadProgress + '%');
                loadingBar.style.width = loadProgress + '%';
                
                if (loadProgress === 100) {
                    clearInterval(loadInterval);
                    sessionStorage.setItem('siteLoaded', 'true');
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        preloader.style.visibility = 'hidden';
                        preloader.style.display = 'none';
                    }, 300);
                }
            }, 30);
        }
    }

    // 2. Sound Design (Clicks and Hovers)
    const audioClick = document.getElementById('audio-click');
    const audioHover = document.getElementById('audio-hover');
    let soundEnabled = true;

    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(soundEnabled && audioHover) {
                audioHover.currentTime = 0;
                audioHover.volume = 0.1;
                audioHover.play().catch(e => {});
            }
        });
        el.addEventListener('click', () => {
            if(soundEnabled && audioClick) {
                audioClick.currentTime = 0;
                audioClick.volume = 0.2;
                audioClick.play().catch(e => {});
            }
        });
    });

    // 3. Easter Egg: Matrix Rain
    let secretCode = ['h', 'a', 'n', 's'];
    let inputCode = [];
    const matrixCanvas = document.getElementById('matrix-canvas');
    let matrixInterval;

    window.addEventListener('keydown', (e) => {
        inputCode.push(e.key.toLowerCase());
        inputCode = inputCode.slice(-4);
        
        if (JSON.stringify(inputCode) === JSON.stringify(secretCode)) {
            if(matrixCanvas) {
                matrixCanvas.classList.toggle('active');
                if(matrixCanvas.classList.contains('active')) {
                    startMatrix();
                } else {
                    clearInterval(matrixInterval);
                }
            }
        }
    });

    function startMatrix() {
        const ctx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const chars = 'HANS10101101'.split('');
        const fontSize = 14;
        const columns = matrixCanvas.width / fontSize;
        const drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        clearInterval(matrixInterval);
        matrixInterval = setInterval(draw, 33);
    }

    // 4. Bilingual Toggle System
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('portfolio-lang') || 'en';
    
    function applyLanguage(lang) {
        document.querySelectorAll('[data-en][data-id]').forEach(el => {
            el.innerText = el.getAttribute(`data-${lang}`);
        });
        if(langToggle) langToggle.innerText = lang.toUpperCase();
        localStorage.setItem('portfolio-lang', lang);
    }

    applyLanguage(currentLang);

    if(langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'id' : 'en';
            applyLanguage(currentLang);
        });
    }

    // 5. Zen Mode (Accessibility)
    const zenToggle = document.getElementById('zen-toggle');
    let isZen = localStorage.getItem('portfolio-zen') === 'true';

    function applyZen(zen) {
        if(zen) {
            document.body.classList.add('zen-mode');
            if(zenToggle) zenToggle.innerHTML = '<i class="fa-solid fa-leaf" style="color: #10B981;"></i>';
        } else {
            document.body.classList.remove('zen-mode');
            if(zenToggle) zenToggle.innerHTML = '<i class="fa-solid fa-leaf"></i>';
        }
        localStorage.setItem('portfolio-zen', zen);
    }

    applyZen(isZen);

    if(zenToggle) {
        zenToggle.addEventListener('click', () => {
            isZen = !isZen;
            applyZen(isZen);
        });
    }

    // 6. Chatbot AI Mock
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => chatWindow.classList.add('active'));
        chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));

        function botReply(text) {
            setTimeout(() => {
                const msg = document.createElement('div');
                msg.className = 'msg bot-msg';
                msg.innerText = text;
                chatMessages.appendChild(msg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }

        function handleSend() {
            const val = chatInput.value.trim();
            if(val) {
                const msg = document.createElement('div');
                msg.className = 'msg user-msg';
                msg.innerText = val;
                chatMessages.appendChild(msg);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                const lowerVal = val.toLowerCase();
                if(lowerVal.includes('price') || lowerVal.includes('harga')) {
                    botReply(currentLang === 'en' ? "My pricing depends on the project scope. Let's schedule a call!" : "Harga tergantung skala proyek. Mari kita jadwalkan obrolan!");
                } else if (lowerVal.includes('skill') || lowerVal.includes('bisa apa')) {
                    botReply(currentLang === 'en' ? "Hans specializes in Web Development, Mobile Apps, UI/UX design, and Video Editing!" : "Hans spesialis di Web, Mobile, desain UI/UX, dan Video Editing!");
                } else {
                    botReply(currentLang === 'en' ? "Thanks for reaching out! Hans will get back to you soon." : "Terima kasih! Hans akan membalas pesan Anda segera.");
                }
            }
        }

        chatSend.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') handleSend();
        });
    }
});

// TagCanvas & Isotope & Swiper Initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        TagCanvas.Start('skill-canvas', 'tags', {
            textColour: '#00F0FF',
            outlineColour: 'transparent',
            reverse: true,
            depth: 0.8,
            maxSpeed: 0.05,
            textFont: null,
            weight: true,
            weightFrom: 'data-weight',
            shadow: '#3B82F6',
            shadowBlur: 3
        });
    } catch(e) {}
    
    const observer = new MutationObserver(() => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        try {
            TagCanvas.tc['skill-canvas'].textColour = isLight ? '#3B82F6' : '#00F0FF';
            TagCanvas.Update('skill-canvas');
        } catch(e) {}
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    if (typeof Isotope !== 'undefined') {
        setTimeout(() => {
            const grid = document.querySelector('#portfolio-grid');
            if(grid) {
                const iso = new Isotope(grid, {
                    itemSelector: '.filter-item',
                    layoutMode: 'fitRows'
                });
                
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                        iso.arrange({ filter: e.target.getAttribute('data-filter') });
                    });
                });
            }
        }, 500);
    }

    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            effect: "cards",
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
});

// =========================================
// INIT 3D CYBER GLOBE & MOON (HOME PAGE)
// =========================================
window.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globe-bg');
    if (!globeContainer) return; 
    
    if (typeof Globe === 'undefined') {
        console.error('Globe.js library belum dimuat!');
        return;
    }

    const world = Globe()(globeContainer)
        .backgroundColor('#050508')
        .showAtmosphere(true)
        .atmosphereColor('#00f0ff')
        .atmosphereAltitude(0.35)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
        .width(window.innerWidth)
        .height(window.innerHeight);

    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.8;
    world.controls().enableZoom = false;

    fetch('https://unpkg.com/globe.gl/example/datasets/ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(countries => {
            world.polygonsData(countries.features)
                .polygonCapColor(() => 'rgba(0, 0, 0, 0)')
                .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
                .polygonStrokeColor(() => '#00f0ff');
        });

    setTimeout(() => {
        const scene = world.scene();
        const moonGeo = new THREE.SphereGeometry(12, 32, 32);
        const moonMat = new THREE.MeshStandardMaterial({ 
            color: 0x8892b0, 
            emissive: 0x112233,
            roughness: 0.9 
        });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        scene.add(moonMesh);

        let angle = 0;
        function animateMoon() {
            angle += 0.003;
            const distance = 160;
            moonMesh.position.x = Math.cos(angle) * distance;
            moonMesh.position.z = Math.sin(angle) * distance;
            moonMesh.position.y = Math.sin(angle * 0.5) * 30;
            requestAnimationFrame(animateMoon);
        }
        animateMoon();
    }, 1000);

    window.addEventListener('resize', () => {
        world.width(window.innerWidth);
        world.height(window.innerHeight);
    });
});