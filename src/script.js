// State management
let windows = {
    contact: { isOpen: true, zIndex: 6 },
    about: { isOpen: true, zIndex: 5 },
    projects: { isOpen: false, zIndex: 4 },
    skills: { isOpen: false, zIndex: 3 }
};

let topZIndex = 6;
let draggedWindow = null;
let dragOffset = { x: 0, y: 0 };

// Window configurations
const windowConfigs = {
    contact: {
        title: 'Contact.exe',
        width: 320,
        height: 520,
        initialX: 150,
        initialY: 50
    },
    about: {
        title: 'A_propos.txt',
        width: 550,
        height: 520,
        initialX: 500,
        initialY: 50
    },
    projects: {
        title: 'Projets',
        width: 500,
        height: 500,
        initialX: 250,
        initialY: 120
    },
    skills: {
        title: 'Compétences.dat',
        width: 450,
        height: 550,
        initialX: 225,
        initialY: 80
    }
};

// Initialize stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

// Update time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
}

// Create window HTML
function createWindowHTML(windowId) {
    const config = windowConfigs[windowId];
    const content = getWindowContent(windowId);
    
    return `
        <div class="window" id="window-${windowId}" style="width: ${config.width}px; height: ${config.height}px; left: ${config.initialX}px; top: ${config.initialY}px; z-index: ${windows[windowId].zIndex};">
            <div class="window-border">
                <div class="window-titlebar" data-window="${windowId}">
                    <div class="window-title">
                        <div class="window-icon"></div>
                        <span>${config.title}</span>
                    </div>
                    <div class="window-buttons">
                        <!--<button class="window-button btn-minimize" data-action="minimize" data-window="${windowId}">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <button class="window-button btn-maximize" data-action="maximize" data-window="${windowId}">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18"></rect>
                            </svg>
                        </button>-->
                        <button class="window-button btn-close" data-action="close" data-window="${windowId}">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="window-content">
                    ${content}
                </div>
                <div class="window-footer">
                    <div class="footer-dots">
                        ${Array(8).fill('<div class="footer-dot"></div>').join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get window content based on type
function getWindowContent(windowId) {
    switch(windowId) {

    ////  PAGE CONTACT  ////
        case 'contact':
            return `
                <div class="window-inner">
                    <div class="contact-avatar" style="background-image: url('src/IMG_9988_square.JPG'); background-size: cover;">
                        <!--<div class="contact-avatar-inner"></div>-->
                    </div>
                    <h2 class="contact-title">Arthur DEVAUX</h2>
                    <h2 class="contact-title">Mes coordonnées:</h2>
                    <div class="contact-buttons">
                        <button class="contact-button">
                            <div class="contact-icon">
                                <svg width="32" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <!-- transformer en lien mailto -->
                            <span><a href="mailto:arthur.devaux17@gmail.com" style="color: inherit; text-decoration: none;">Gmail</a></span>
                        </button>
                        <button class="contact-button">
                            <div class="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </div>
                            <span><a href="https://www.linkedin.com/in/devaux-arthur/" target="_blank" style="color: inherit; text-decoration: none;">@devaux-arthur</a></span>
                        </button>
                        <button class="contact-button">
                            <div class="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </div>
                            <span><a href="https://github.com/Linkus-star" target="_blank" style="color: inherit; text-decoration: none;">@Linkus-star</a></span>
                        </button>
                        <button class="contact-button">
                            <div class="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </div>
                            <span><a href="https://www.instagram.com/art_dvx/" target="_blank" style="color: inherit; text-decoration: none;">@art_dvx</a></span>
                        </button>
                    </div>
                    <!--<button class="ok-button">got it!</button>-->
                </div>
            `;
        
    ////  PAGE FORMATION/COMPETENCES  ////
        case 'about':
            return `
            <!-- Page en français -->
                <div class="text-content">
                    <h2>Formation:</h2>
                    <p>▪ Etudiant: BUT - MMI (Campus d'Elbeuf) 2024-2027</p>
                    <p>▪ Baccalauréat Général Spécialité Mathématiques & NSI - Lycée Louis Modeste Leroy à Évreux 2024</p>
                    <!--<p>▪ Domestika - Character Design for Animation in Games 2023</p>-->

                    <h2>Logiciels/Langages:</h2>
                    <div class="skills-grid">
                        <div class="skill-item">
                            <p>▪ Photoshop</p>
                            <div class="skill-bars">
                                ${Array(3).fill('<div class="skill-bar"></div>').join('')}
                                <div class="skill-bar-empty"></div>
                                <div class="skill-bar-empty"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <p>▪ Aseprite</p>
                            <div class="skill-bars">
                                ${Array(5).fill('<div class="skill-bar"></div>').join('')}
                            </div>
                        </div>
                        <div class="skill-item">
                            <p>▪ Illustrator</p>
                            <div class="skill-bars">
                                ${Array(4).fill('<div class="skill-bar"></div>').join('')}
                                <div class="skill-bar-empty"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <p>▪ VS Code</p>
                            <div class="skill-bars">
                                ${Array(5).fill('<div class="skill-bar"></div>').join('')}
                            </div>
                        </div>
                        <!-- J'en ajouterai d'autres logiciels/langages si besoin -->
                    </div>

                    <h2>Compétences:</h2>
                    <p>▪ Anglais et Espagnol</p>
                    <p>▪ Travail en équipe</p>
                    <p>▪ Apprentissage rapide</p>
                    <p>▪ Polyvalence</p>
                </div>
            `;
        
    ////  PAGE PROJETS  ////
        case 'projects':
            return `
                <div class="text-content">
                    <h2>Mes Réalisations:</h2>
                    <h3>Développement:</h3>
                    <div class="project-item">
                        <div class="project-header">
                            <div class="project-icon"></div>
                            <h3 class="project-title">Project_Alpha.exe</h3>
                        </div>
                        <p class="project-description">A pixel art adventure game built with Unity</p>
                        <div class="project-tags">
                            <span class="project-tag">Unity</span>
                            <span class="project-tag">C#</span>
                            <span class="project-tag">Pixel Art</span>
                        </div>
                    </div>
                    
                    <div class="project-item">
                        <div class="project-header">
                            <div class="project-icon"></div>
                            <h3 class="project-title">Food-Craft/index.html</h3>
                        </div>
                        <p class="project-description">Réalisation d'un site vitrine pour un foodtruck fictif nommé <b>Food-Craft</b>.</p>
                        <div class="project-tags">
                            <span class="project-tag">React</span>
                            <span class="project-tag">TypeScript</span>
                            <span class="project-tag">Tailwind</span>
                        </div>
                    </div>
                    
                    <h3>Création:</h3>
                    <div class="project-item">
                        <div class="project-header">
                            <div class="project-icon"></div>
                            <h3 class="project-title">Game_Jam_2024.zip</h3>
                        </div>
                        <p class="project-description">Top-down shooter game created in 48 hours</p>
                        <div class="project-tags">
                            <span class="project-tag">Unity</span>
                            <span class="project-tag">Game Design</span>
                            <span class="project-tag">Aseprite</span>
                        </div>
                    </div>
                    
                    <div class="project-item">
                        <div class="project-header">
                            <div class="project-icon"></div>
                            <h3 class="project-title">Character_Design.psd</h3>
                        </div>
                        <p class="project-description">Character design portfolio for animation</p>
                        <div class="project-tags">
                            <span class="project-tag">Photoshop</span>
                            <span class="project-tag">Illustration</span>
                            <span class="project-tag">Animation</span>
                        </div>
                    </div>
                    
                    <div class="info-box">
                        <p>💾 Plein de projets à venir...</p>
                    </div>
                </div>
            `;
        
    ////  PAGE COMPETENCES  ////
        case 'skills':
            return `
                <div class="text-content">
                    <h2>Skills.dat</h2>
                    
                    <div class="skill-category">
                        <h3 class="category-title">> Design</h3>
                        <div class="skill-list">
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>UI/UX Design</span>
                                    <span class="skill-level">4/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(4).fill('<div class="skill-bar-full"></div>').join('')}
                                    <div class="skill-bar-empty-full"></div>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Pixel Art</span>
                                    <span class="skill-level">5/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(5).fill('<div class="skill-bar-full"></div>').join('')}
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Character Design</span>
                                    <span class="skill-level">4/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(4).fill('<div class="skill-bar-full"></div>').join('')}
                                    <div class="skill-bar-empty-full"></div>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Animation</span>
                                    <span class="skill-level">3/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(3).fill('<div class="skill-bar-full"></div>').join('')}
                                    ${Array(2).fill('<div class="skill-bar-empty-full"></div>').join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3 class="category-title">> Development</h3>
                        <div class="skill-list">
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Unity</span>
                                    <span class="skill-level">4/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(4).fill('<div class="skill-bar-full"></div>').join('')}
                                    <div class="skill-bar-empty-full"></div>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>C#</span>
                                    <span class="skill-level">3/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(3).fill('<div class="skill-bar-full"></div>').join('')}
                                    ${Array(2).fill('<div class="skill-bar-empty-full"></div>').join('')}
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>React</span>
                                    <span class="skill-level">3/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(3).fill('<div class="skill-bar-full"></div>').join('')}
                                    ${Array(2).fill('<div class="skill-bar-empty-full"></div>').join('')}
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>TypeScript</span>
                                    <span class="skill-level">3/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(3).fill('<div class="skill-bar-full"></div>').join('')}
                                    ${Array(2).fill('<div class="skill-bar-empty-full"></div>').join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3 class="category-title">> Tools</h3>
                        <div class="skill-list">
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Photoshop</span>
                                    <span class="skill-level">5/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(5).fill('<div class="skill-bar-full"></div>').join('')}
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Aseprite</span>
                                    <span class="skill-level">5/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(5).fill('<div class="skill-bar-full"></div>').join('')}
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Figma</span>
                                    <span class="skill-level">4/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(4).fill('<div class="skill-bar-full"></div>').join('')}
                                    <div class="skill-bar-empty-full"></div>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Git</span>
                                    <span class="skill-level">3/5</span>
                                </div>
                                <div class="skill-bar-container">
                                    ${Array(3).fill('<div class="skill-bar-full"></div>').join('')}
                                    ${Array(2).fill('<div class="skill-bar-empty-full"></div>').join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-box" style="border-color: #22d3ee; background: rgba(6, 78, 89, 0.2);">
                        <p style="color: #67e8f9;">ℹ️ Always learning and improving!</p>
                    </div>
                </div>
            `;
    }
}

// Render windows
function renderWindows() {
    const container = document.getElementById('windows-container');
    container.innerHTML = '';
    
    Object.keys(windows).forEach(windowId => {
        if (windows[windowId].isOpen) {
            container.innerHTML += createWindowHTML(windowId);
        }
    });
    
    attachWindowEventListeners();
}

// Open/Close windows
function openWindow(windowId) {
    if (!windows[windowId].isOpen) {
        windows[windowId].isOpen = true;
        windows[windowId].zIndex = ++topZIndex;
        renderWindows();
    } else {
        focusWindow(windowId);
    }
}

function closeWindow(windowId) {
    windows[windowId].isOpen = false;
    renderWindows();
}

function focusWindow(windowId) {
    if (windows[windowId].zIndex !== topZIndex) {
        windows[windowId].zIndex = ++topZIndex;
        const windowElement = document.getElementById(`window-${windowId}`);
        if (windowElement) {
            windowElement.style.zIndex = windows[windowId].zIndex;
        }
    }
}

// Drag functionality
function startDrag(e, windowId) {
    if (e.target.closest('.window-button')) return;
    
    draggedWindow = windowId;
    const windowElement = document.getElementById(`window-${windowId}`);
    const rect = windowElement.getBoundingClientRect();
    
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    
    focusWindow(windowId);
    
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
}

function handleDrag(e) {
    if (!draggedWindow) return;
    
    const windowElement = document.getElementById(`window-${draggedWindow}`);
    windowElement.style.left = `${e.clientX - dragOffset.x}px`;
    windowElement.style.top = `${e.clientY - dragOffset.y}px`;
}

function stopDrag() {
    draggedWindow = null;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
}

// Attach event listeners
function attachWindowEventListeners() {
    // Titlebar drag
    document.querySelectorAll('.window-titlebar').forEach(titlebar => {
        const windowId = titlebar.dataset.window;
        titlebar.addEventListener('mousedown', (e) => startDrag(e, windowId));
    });
    
    // Window buttons
    document.querySelectorAll('.window-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = button.dataset.action;
            const windowId = button.dataset.window;
            
            if (action === 'close') {
                closeWindow(windowId);
            }
        });
    });
    
    // Window focus
    document.querySelectorAll('.window').forEach(windowEl => {
        windowEl.addEventListener('mousedown', () => {
            const windowId = windowEl.id.replace('window-', '');
            focusWindow(windowId);
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    updateTime();
    setInterval(updateTime, 60000);
    renderWindows();
    
    // Desktop icons double click
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const windowId = icon.dataset.window;
            openWindow(windowId);
        });
    });
    
    // Quick launch buttons
    document.querySelectorAll('.quick-launch').forEach(button => {
        button.addEventListener('click', () => {
            const windowId = button.dataset.window;
            openWindow(windowId);
        });
    });
});
