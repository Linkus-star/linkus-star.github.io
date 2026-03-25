// State management
let windows = {
    contact: { isOpen: true, zIndex: 6 },
    about: { isOpen: true, zIndex: 5 },
    projects: { isOpen: false, zIndex: 4 },
    skills: { isOpen: false, zIndex: 3 },

    // mes diff° réalisations
    food_craft: { isOpen: false, zIndex: 10 },
    seinemarathon: { isOpen: false, zIndex: 10 },
    billetterie: { isOpen: false, zIndex: 10 },
    surf_truck: { isOpen: false, zIndex: 10 },
    bottine: { isOpen: false, zIndex: 10 },
    canidae: { isOpen: false, zIndex: 10 },
    dashboard: { isOpen: false, zIndex: 10 },
    french_tech_voeux: { isOpen: false, zIndex: 10 }
};

// Z-index management
let topZIndex = 6;
let draggedWindow = null;
let dragOffset = { x: 0, y: 0 };

// Window configurations
const windowConfigs = {
    contact: { title: 'Contact.exe', icon: 'src/envelope.png', width: 320, height: 520, initialX: 150, initialY: 80 },
    about: { title: 'A_propos.txt', icon: 'src/notepad.png', width: 550, height: 520, initialX: 500, initialY: 100 },
    projects: { title: 'Projets', icon: 'src/folder.png', width: 550, height: 600, initialX: 250, initialY: 50 },
    skills: { title: 'Compétences.dat', icon: 'src/computer.png', width: 450, height: 550, initialX: 225, initialY: 80 },

    // mes diff° réalisations
    food_craft: {
        title: 'Food-Craft/index.html',
        icon: 'src/explorer.png',
        width: 600,
        height: 500,
        initialX: 100,
        initialY: 50
    },
    seinemarathon: {
        title: 'Seinemarathon76.fr',
        icon: 'src/explorer.png', 
        width: 600,
        height: 500,
        initialX: 150,
        initialY: 80
    },

    dashboard: {
        title: 'Dashboard_Meteo.php',
        icon: 'src/computer.png', // Icône ordi
        width: 750,
        height: 600,
        initialX: 80,
        initialY: 40
    },
    
    billetterie: {
        title: 'Billetterie_MMI.php',
        icon: 'src/explorer.png',
        width: 650, height : 550, initialX: 120, initialY: 90
    },
    surf_truck: {
        title: 'Surf_Truck.ai',
        icon: 'src/paint.png',
        width: 600, height: 500, initialX: 180, initialY: 90
    },
    bottine: {
        title: 'Bottine_Redesign.ai',
        icon: 'src/paint.png',
        width: 600, height: 500, initialX: 200, initialY: 100
    },
    canidae: {
        title: 'Canidae_Dior_Pub.psd',
        icon: 'src/paint.png',
        width: 500, height: 600, initialX: 250, initialY: 50
    },
    french_tech_voeux: {
        title: 'SAE_302_FrenchTech_Motion.mp4',
        icon: 'src/paint.png',
        width: 700,
        height: 620,
        initialX: 140,
        initialY: 60
    }
};

// les étoiles sympa dans le fond
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
                        <img src="${config.icon}" alt="${config.title} Icon" class="window-icon" style="background: none;">
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
                    <!--<div class="footer-dots">
                        ${Array(25).fill('<div class="footer-dot"></div>').join('')}
                    </div>-->
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
                            <a href="mailto:arthur.devaux17@gmail.com" style="color: inherit; text-decoration: none;">Gmail</a>
                        </button>
                        <button class="contact-button">
                            <div class="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </div>
                            <a href="https://www.linkedin.com/in/devaux-arthur/" target="_blank" style="color: inherit; text-decoration: none;">@devaux-arthur</a>
                        </button>
                        <button class="contact-button">
                            <div class="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </div>
                            <a href="https://github.com/Linkus-star" target="_blank" style="color: inherit; text-decoration: none;">@Linkus-star</a>
                        </button>
                        <button class="contact-button">
                            <div class="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </div>
                            <a href="https://www.instagram.com/art_dvx/" target="_blank" style="color: inherit; text-decoration: none;">@art_dvx</a>
                        </button>
                    </div>

                    <!-- CV Button pour télécharger le fichier -->
                    <a href="src/CV_Arthur_Devaux_MMI_2026.pdf" target="_blank" download="CV_Arthur_Devaux.pdf" class="ok-button" style="color: inherit; text-decoration: none; text-align: center; margin-top: 20px;"> 
                        📥 Télécharger mon CV
                    </a>
                    <!--
                        <a href="src/CV_Arthur_Devaux_MMI_2024.pdf" download>
                            <button class="ok-button">
                                <div class="cv-icon">Télécharger mon cv
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 13 7 8"></polyline>
                                        <line x1="12" y1="13" x2="12" y2="2"></line>
                                    </svg>
                                </div>
                            </button>
                        </a>
                    -->
                </div>
            `;
        
    ////  PAGE A PROPOS - FORMATION/COMPETENCES  ////
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
                            <!--<div class="skill-bars">
                                ${Array(3).fill('<div class="skill-bar"></div>').join('')}
                                <div class="skill-bar-empty"></div>
                                <div class="skill-bar-empty"></div>
                            </div>-->
                        </div>
                        <div class="skill-item">
                            <p>▪ After Effects</p>
                            <!--<div class="skill-bars">
                                ${Array(5).fill('<div class="skill-bar"></div>').join('')}
                            </div>-->
                        </div>
                        <div class="skill-item">
                            <p>▪ Illustrator</p>
                            <!--<div class="skill-bars">
                                ${Array(4).fill('<div class="skill-bar"></div>').join('')}
                                <div class="skill-bar-empty"></div>
                            </div>-->
                        </div>
                        <div class="skill-item">
                            <p>▪ Premiere Pro</p>
                        </div>
                        <div class="skill-item">
                            <p>▪ VS Code</p>
                            <!--<div class="skill-bars">
                                ${Array(5).fill('<div class="skill-bar"></div>').join('')}
                            </div>-->
                        </div>
                        <div class="skill-item">
                            <p>▪ Figma</p>
                        </div>
                        <div class="skill-item">
                            <p>▪ HTML/CSS/JS</p>
                        </div>
                        <div class="skill-item">
                            <p>▪ PHP</p>
                        </div>
                        <div class="skill-item">
                            <p>▪ MY SQL</p>
                        </div>
						<div class="skill-item">
                            <p>▪ WordPress</p>
                        </div>
						<div class="skill-item">
                            <p>▪ Prestahop</p>
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
                    
                    <h3>> Développement Web</h3>

                    <div class="project-item" onclick="openWindow('billetterie')" style="cursor: pointer;">
                        <div class="project-header">
                            <!--<div class="project-icon"></div>-->
                            <img src="src/explorer.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">Billeterie_MMI.php</h3>
                        </div>
                        <p class="project-description">Système complet de réservation de billets avec gestion de Base de Données.</p>
                        <div class="project-tags">
                            <span class="project-tag">PHP</span>
                            <span class="project-tag">SQL</span>
                            <span class="project-tag">HTML/CSS</span>
                        </div>
                    </div>

                    <div class="project-item" onclick="openWindow('food_craft')" style="cursor: pointer;">
                        <div class="project-header">
                            <!--<div class="project-icon"></div>-->
                            <img src="src/explorer.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">Food-Craft/index.html</h3>
                        </div>
                        <p class="project-description">Réalisation d'un site vitrine pour un foodtruck fictif nommé <b>Food-Craft</b>.</p>
                        <div class="project-tags">
                            <span class="project-tag">HTML</span>
                            <span class="project-tag">Javascript</span>
                            <span class="project-tag">CSS</span>
                            <span class="project-tag">No-Framework</span>
                        </div>
                    </div>

                    <div class="project-item" onclick="openWindow('dashboard')" style="cursor: pointer;">
                        <div class="project-header">
                            <img src="src/explorer.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">Dashboard_Meteo.php</h3>
                        </div>
                        <p class="project-description">Visualisation de données météo de <br>Charente-Maritime (1950-2022).</p>
                        <div class="project-tags">
                            <span class="project-tag">Data Viz</span>
                            <span class="project-tag">SQL</span>
                            <span class="project-tag">JS</span>
                        </div>
                    </div>
                    
                    <h3 style="margin-top: 20px;">> Création</h3> 

                    <div class="project-item" onclick="openWindow('seinemarathon')" style="cursor: pointer;">
                        <div class="project-header">
                            <!--<div class="project-icon"></div>-->
                            <img src="src/explorer.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">Seinemarathon76.fr</h3>
                        </div>
                        <p class="project-description">Création d'une interface d'application web & mobile pour gérer les missions en tant que admin ou bénévole pour le marathon.</p>
                        <div class="project-tags">
                            <span class="project-tag">Figma</span>
                            <span class="project-tag">Web Design</span>
                            <span class="project-tag">UX Design</span>
                        </div>
                    </div>

                    <div class="project-item" onclick="openWindow('surf_truck')" style="cursor: pointer;">
                        <div class="project-header">
                            <!--<div class="project-icon"></div>-->
                            <img src="src/paint.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">Surf_Truck.ai</h3>
                        </div>
                        <p class="project-description">Création identité visuelle pour une enseigne de surf.</p>
                        <div class="project-tags">
                            <span class="project-tag">Illustrator</span>
                            <span class="project-tag">Branding</span>
                        </div>
                    </div>

                    <div class="project-item" onclick="openWindow('bottine')" style="cursor: pointer;">
                        <div class="project-header">
                            <!--<div class="project-icon"></div>-->
                            <img src="src/paint.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">La_Bottine_Redesign.ai</h3>
                        </div>
                        <p class="project-description">Refonte de logo et flyer pizzeria.</p>
                        <div class="project-tags">
                            <span class="project-tag">Illustrator</span>
                            <span class="project-tag">Print</span>
                        </div>
                    </div>

                    <div class="project-item" onclick="openWindow('canidae')" style="cursor: pointer;">
                        <div class="project-header">
                            <!--<div class="project-icon"></div>-->
                            <img src="src/paint.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">Canidae_Dior_Pub.psd</h3>
                        </div>
                        <p class="project-description">Photomontage publicitaire Parfum.</p>
                        <div class="project-tags">
                            <span class="project-tag">Photoshop</span>
                            <span class="project-tag">Publicité</span>
                        </div>
                    </div>

                    <div class="project-item" onclick="openWindow('french_tech_voeux')" style="cursor: pointer;">
                        <div class="project-header">
                            <img src="src/paint.png" class="project-icon" style="background: none; border: none;">
                            <h3 class="project-title">SAE_302_FrenchTech_Motion.mp4</h3>
                        </div>
                        <p class="project-description">Motion design de fin d'année pour que La French Tech souhaite ses voeux à ses collaborateurs.</p>
                        <div class="project-tags">
                            <span class="project-tag">After Effects</span>
                            <span class="project-tag">Motion Design</span>
                            <span class="project-tag">SAE 302</span>
                        </div>
                    </div>
                    
                    <div class="info-box">
                        <p>Cliquez sur un fichier pour l'ouvrir.</p>
                    </div>
                </div>
            `;
        
    ////  PAGE COMPETENCES  ////
        case 'skills':
            return `
                <div class="text-content">
                    <h2>Mes compétences</h2>
                    
                    <div class="skill-category">
                        <h3 class="category-title">> Design</h3>
                        <div class="skill-list">
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>UI/UX Design</span>
                                    <span class="skill-level">Intermédiaire</span>
                                </div>
                                <!--<div class="skill-bar-container">
                                    ${Array(4).fill('<div class="skill-bar-full"></div>').join('')}
                                    <div class="skill-bar-empty-full"></div>
                                </div>-->
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Pixel Art</span>
                                    <span class="skill-level">Débutant/Intermédiaire</span>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Logo/Vecteur</span>
                                    <span class="skill-level">Avancé</span>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Animation</span>
                                    <span class="skill-level">Débutant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3 class="category-title">> Développement</h3>
                        <div class="skill-list">
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>PHP / MySQL</span>
                                    <span class="skill-level">Intermédiaire</span>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>HTML5 / CSS3</span>
                                    <span class="skill-level">Avancé</span>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                <span>JavaScript (Vanilla)</span>
                                    <span class="skill-level">Intermédiaire</span>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Responsive Design</span>
                                    <span class="skill-level">Avancé</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3 class="category-title">> Outils-Logiciels</h3>
                        <div class="skill-list">
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Photoshop</span>
                                    <span class="skill-level">Intermédiaire</span>
                                </div>
                                <!--<div class="skill-bar-container">
                                    ${Array(5).fill('<div class="skill-bar-full"></div>').join('')}
                                </div>-->
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Aseprite</span>
                                    <span class="skill-level">Débutant</span>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Figma</span>
                                    <span class="skill-level">Avancé</span>
                                </div>
                            </div>
                            <div class="skill-list-item">
                                <div class="skill-header">
                                    <span>Git</span>
                                    <span class="skill-level">Débutant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!--<div class="info-box" style="border-color: #22d3ee; background: rgba(6, 78, 89, 0.2);">
                        <p style="color: #67e8f9;">ℹ️ Tjrs en train d'apprendre et de m'améliorer</p>
                    </div>-->
                </div>
            `;


    //// Les PAGES DETAILLEES DE MES REALISATIONS  ////
    ////  PAGE DETAIL : BILLETTERIE  ////
        case 'billetterie':
            return `
                <div class="window-inner">
                    <img src="src/Billeterie.png" style="width: 100%; border: 2px solid white; margin-bottom: 16px;">

                    <h2>Billetterie MMI</h2>
                    <p><strong>Type :</strong> Projet Universitaire (Back-End focus)</p>
                    <p><strong>Stack :</strong> PHP, MySQL, HTML5, CSS3, JS</p>

                    <hr style="border: 1px solid #789742; margin: 16px 0;">

                    <h3>Le Projet</h3>
                    <p>Développement d'une plateforme complète de réservation pour des événements (spectacles, concerts ou autres).</p>

                    <h3>Fonctionnalités clés</h3>
                    <ul>
                        <li>Système d'inscription et de connexion utilisateurs.</li>
                        <li>Gestion dynamique du stock de billets via base de données SQL.</li>
                        <li>Interface d'administration pour ajouter des événements.</li>
                    </ul>

                    <br>
                    <button class="ok-button" onclick="closeWindow('billetterie')">Fermer</button>
                </div>
            `;
        
    ////  PAGE DETAIL : FOOD CRAFT  ////
        case 'food_craft':
            return `
                <div class="window-inner">
                <img src="src/Food-craft_Home.png" style="width: 100%; height: auto; border: 2px solid white; margin-bottom: 16px;">
                
                <h2>Food-Craft</h2>
                <p><strong>Type :</strong> Site Vitrine</p>
                <p><strong>Stack :</strong> HTML5 / CSS3 / JS</p>
                
                <hr style="border: 1px solid #789742; margin: 16px 0;">
                
                <h3>Le Sujet</h3>
                <p>Dans le cadre d'une SAE, nous devions produire un site web présentant les services proposés par un Food-truck fictif.</p>
                <p>J'ai donc créé le food-truck <strong>FoodCraft</strong>, sur le thème de Minecraft, qui propose des plats inspirés de l'univers de ce jeu iconique.</p>
                
                <h3>Fonctionnalités</h3>
                <ul>
                    <li>Menu interactif</li>
                    <li>Carte des lieux</li>
                    <li>Formulaire de contact</li>
                </ul>

                <br>
                <img src="src/Food-craft_Menu.png" style="width: 100%; height: auto; border: 2px solid white; margin-bottom: 16px;">
                <br>
                <button class="ok-button" onclick="closeWindow('food_craft')">Fermer</button>
            </div>
        `;

    ////  PAGE DETAIL : SEINE MARATHON  ////
    case 'seinemarathon':
        return `
            <div class="window-inner">
                
                <h2>Seine Marathon 76</h2>
                <p><strong>Outil :</strong> Figma</p>
                <p><strong>Contexte :</strong> Projet UX/UI Bénévole/Admin</p>
                <p><strong>Réalisé avec :</strong> Louis Cadix, Louis Huang & Émilie Ferreira</p>

                <hr style="border: 1px solid #789742; margin: 16px 0;">
                
                <h3>L'objectif</h3>
                <p>En groupe, concevoir une interface intuitive pour que les bénévoles puissent gérer leurs missions le jour de la course.</p>
                <p>Nous devions rendre cette interface également interactive grâce à la partie Prototype de Figma.</p>
                
                <br>
                <div style="display: flex; justify-content: center; margin-bottom: 16px;">
                    <img src="src/Admin_Marathon.png" style="width: 400px; height: auto; border: 4px solid #333; border-radius: 10px;">
                </div>
                <br>
                <div style="display: flex; justify-content: center; margin-bottom: 16px;">
                    <img src="src/Volunteer_Profil.png" style="width: 200px; height: auto; border: 4px solid #333; border-radius: 10px;">
                </div>
                <br>
                <button class="ok-button" onclick="closeWindow('seinemarathon')">Fermer</button>
            </div>
        `;
    
    ////  PAGE DÉTAIL : DASHBOARD METEO  ////
    case 'dashboard':
        return `
            <div class="window-inner">
                <img src="src/Dashboard.png" style="width: 100%; border: 2px solid white; margin-bottom: 16px;">
                
                <h2>Dashboard Météo</h2>
                <p><strong>Type :</strong> Visualisation de Données</p>
                <p><strong>Données :</strong> Charente Maritime (1950-2022)</p>
                
                <hr style="border: 1px solid #789742; margin: 16px 0;">
                
                <h3>Ce qu'il fallait faire :</h3>
                <p>Concevoir une interface capable d'afficher et de trier des données météorologiques d'une base de données sur le Département de la Charente-Maritime.</p>
                
                <h3>Fonctionnalités</h3>
                <ul>
                    <li>Cartographie interactive (Leaflet) avec position des stations.</li>
                    <li>Graphiques dynamiques (Courbes de température, diagrammes circulaires).</li>
                    <li>Filtres temporels et géographiques.</li>
                </ul>

                <br>
                <button class="ok-button" onclick="closeWindow('dashboard')">Fermer</button>
            </div>
        `;


    ////  PAGE DÉTAIL : SURF TRUCK  ////
    case 'surf_truck':
        return `
            <div class="window-inner">
                <img src="src/Surf_truck.jpg" style="width: 100%; background: white; border: 2px solid white; margin-bottom: 16px; padding: 10px;">
                
                <h2>Projet Surf Truck</h2>
                <p><strong>Logiciels :</strong> Illustrator, Figma</p>
                
                <hr style="border: 1px solid #789742; margin: 16px 0;">
                
                <h3>Identité Visuelle</h3>
                <p>Création de la charte graphique pour un Surf-Truck qui fait de la location et vente d'équipement de surf.</p>
                <p>Le logo combine les vagues et l'aspect "Surf", avec les couleurs de la mer et du sable.</p>

                <br>
                <button class="ok-button" onclick="closeWindow('surf_truck')">Fermer</button>
            </div>
        `;

    ////  PAGE DÉTAIL : LA BOTTINE  ////
    case 'bottine':
        return `
            <div class="window-inner">
                <img src="src/La_Bottine.png" style="width: 100%; border: 2px solid white; margin-bottom: 16px;">
                
                <h2>Pizzeria La Bottine</h2>
                <p><strong>Mission :</strong> Refonte Logo & Flyer</p>
                <p><strong>Outil :</strong> Adobe Illustrator</p>
                
                <hr style="border: 1px solid #789742; margin: 16px 0;">
                
                <h3>Le Design</h3>
                <p>Refonte de l'identité visuelle d'une pizzeria locale.</p>
                <p>Lors d'un cours de production graphique, nous devions recréer le logo typographique de la pizzeria La Bottine à notre manière en utilisant Illustrator et refaire un nouveau flyer de la carte du restaurant.</p>

                <br>
                <button class="ok-button" onclick="closeWindow('bottine')">Fermer</button>
            </div>
        `;

    ////  PAGE DÉTAIL : CANIDAE / DIOR  ////
    case 'canidae':
        return `
            <div class="window-inner">
                <img src="src/Canidae_Dior.jpg" style="width: 100%; border: 2px solid white; margin-bottom: 16px;">
                
                <h2>Publicité "Canidae"</h2>
                <p><strong>Projet :</strong> Publicité fictive / Photomontage</p>
                <p><strong>Logiciel :</strong> Photoshop</p>
                
                <hr style="border: 1px solid #789742; margin: 16px 0;">
                
                <h3>Concept</h3>
                <p>Voici Canidae, une campagne publicitaire fictive que j'ai créé pour Dior.</p>
                <p>C'était dans le cadre d'un exercice de composition visuelle et de retouche. J'ai donc utilisé Photoshop pour créer le photomontage, travailler sur la lumière et les ombres, et intégrer la typographie et le produit.</p>

                <br>
                <button class="ok-button" onclick="closeWindow('canidae')">Fermer</button>
            </div>
        `;

    ////  PAGE DÉTAIL : SAE 302 FRENCH TECH  ////
    case 'french_tech_voeux':
        return `
            <div class="window-inner">
                <h2>SAE 302 - La French Tech</h2>
                <p><strong>Projet :</strong> Motion design de voeux de fin d'année</p>
                <p><strong>Durée :</strong>~ 1 minute 30</p>
                <p><strong>Outil :</strong> After Effects</p>

                <hr style="border: 1px solid #789742; margin: 16px 0;">

                <h3>Contexte</h3>
                <p>Dans le cadre de la SAE 302, nous devions réaliser en groupe un motion design pour que La French Tech souhaite les voeux de fin d'année à l'ensemble de ses collaborateurs.</p>

                <h3>Vidéo</h3>
                <video controls style="width: 100%; border: 2px solid white; margin-bottom: 12px; background: black;">
                    <source src="src/Rendu_Final.mp4" type="video/mp4">
                    Votre navigateur ne prend pas en charge la lecture vidéo.
                </video>
                <br>
                <button class="ok-button" onclick="closeWindow('french_tech_voeux')">Fermer</button>
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
	
	// Gestion du Menu Démarrer
    const startButton = document.querySelector('.start-button');
    const startMenu = document.getElementById('start-menu');

    startButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (startMenu.style.display === 'none') {
            startMenu.style.display = 'block';
            startButton.classList.add('active');
        } else {
            startMenu.style.display = 'none';
            startButton.classList.remove('active');
        }
    });

    // Fermer le menu si on clique ailleurs sur l'écran
    document.addEventListener('click', (e) => {
        if (startMenu.style.display === 'block' && !startMenu.contains(e.target) && !startButton.contains(e.target)) {
            startMenu.style.display = 'none';
            startButton.classList.remove('active');
        }
    });

    // Gestion du bouton Power (Extinction simulée)
    const powerButton = document.querySelector('.power-button');
    
    powerButton.addEventListener('click', () => {
        // ecran noir
        const shutdownDiv = document.createElement('div');
        shutdownDiv.className = 'shutdown-screen';
        
        document.body.appendChild(shutdownDiv);
        
        setTimeout(() => {
            location.reload();
        }, 3000);
    });
});
