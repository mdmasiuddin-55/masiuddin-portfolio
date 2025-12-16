// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const downloadResumeBtn = document.getElementById('download-resume');
    
    // Create scroll progress bar
    createScrollProgressBar();
    
    // Mobile navigation toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect and active link highlighting
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // Navbar background on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update scroll progress bar
        updateScrollProgress();
        
        // Highlight active navigation link
        updateActiveNavLink();
        
        // Animate elements on scroll
        animateOnScroll();
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // Download resume functionality
    downloadResumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        downloadResume();
    });
    
    // Initialize animations
    initializeAnimations();
    
    // Typing effect for hero section
    initializeTypingEffect();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Create scroll progress bar
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
}

// Update scroll progress bar
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollTop = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Handle contact form submission
function handleFormSubmission() {
    const formData = new FormData(document.getElementById('contact-form'));
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link with form data
    const mailtoLink = `mailto:mdmasiuddin55@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Thank you for your message! Your email client should open shortly.', 'success');
    
    // Reset form
    document.getElementById('contact-form').reset();
}

// Download resume functionality
function downloadResume() {
    const resumeUrl = './assets/Masiuddin_resume.pdf';

    // Check the file exists before triggering download to avoid misleading success message
    fetch(resumeUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const a = document.createElement('a');
                a.href = resumeUrl;
                a.download = 'Masiuddin_resume.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                showNotification('Resume download started.', 'success');
            } else {
                console.warn('Resume not found:', response.status);
                showNotification('Resume file not found (404).', 'error');
            }
        })
        .catch(err => {
            console.error('Error checking resume file:', err);
            showNotification('Failed to download resume. Please try again later.', 'error');
        });
}


// Generate resume content
/* function generateResumeContent() {
    return `
Masiuddin Mohammed
Cloud & DevOps Engineer
Email: mdmasiuddin55@gmail.com
Phone: +91 7674833218
Location: Hyderabad, India
LinkedIn: https://www.linkedin.com/in/Masiuddin-Mohammed-ahmed
GitHub: https://github.com/k-Mohammed/

OBJECTIVE
To secure a challenging position as a DevOps Engineer where I can utilize my skills in cloud computing, automation, and continuous delivery.

PROFESSIONAL SUMMARY
• 6 months of hands-on experience in AWS & DevOps
• Proficient with AWS services (EC2, S3, IAM, VPC, Route53, etc.)
• Experience with Jenkins, Docker, Kubernetes, Ansible, Terraform
• Familiar with monitoring (CloudWatch), scripting (Bash), and CI/CD pipelines

WORK EXPERIENCE
DevOps Intern | V2R Technologies Pvt Ltd | Oct 2024 – Apr 2025
• Implemented AWS infrastructure for healthcare applications
• Worked with containerization using Docker and orchestration with Kubernetes
• Automated infrastructure provisioning using Terraform and Ansible
• Provided technical support for cloud-based systems
• Developed CI/CD pipelines using Jenkins

PROJECTS
Pace Healthcare App
• Comprehensive healthcare application with cloud infrastructure
• Technologies: AWS, Docker, Terraform, Ansible

Cloud Tech Support Project
• Technical support focusing on system diagnostics and troubleshooting
• Technologies: Linux, Windows, Diagnostics, Troubleshooting

TECHNICAL SKILLS
Cloud Platforms: AWS, EC2, S3, IAM, VPC, Route53
DevOps Tools: Jenkins, Docker, Kubernetes, Ansible, Terraform
Development: Git, Maven, Linux, Python (Basics), Apache, Nginx
Monitoring: CloudWatch, Bash Scripting, CI/CD Pipelines

CERTIFICATIONS
• AWS Cloud & DevOps Fundamentals – Cloud@247.ai

EDUCATION
• B.Com (Computer Applications), Osmania University, 2024

LANGUAGES
• English, Hindi, Telugu
    `.trim();
} */

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                background: var(--card-background);
                color: var(--text-primary);
                padding: 1rem 1.5rem;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-heavy);
                z-index: 10000;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                border-left: 4px solid var(--primary-color);
            }
            
            .notification.success {
                border-left-color: #4ade80;
            }
            
            .notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Initialize animations
function initializeAnimations() {
    // Add entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .skill-category, .project-card, .experience-card, .stat-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
}

// Initialize typing effect
function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = 'Cloud & DevOps Engineer';
    let index = 0;
    
    heroSubtitle.textContent = '';
    
    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Add blinking cursor effect
            heroSubtitle.innerHTML += '<span class="cursor">|</span>';
            
            // Add cursor animation
            const cursorStyles = document.createElement('style');
            cursorStyles.textContent = `
                .cursor {
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(cursorStyles);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Animate elements on scroll
function animateOnScroll() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        if (scrollTop < heroHeight) {
            const parallaxSpeed = scrollTop * 0.5;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    }
    
    // Floating icons animation speed variation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const speed = 1 + (index * 0.1);
        icon.style.animationDuration = `${3 / speed}s`;
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        scrollObserver.observe(section);
    });
    
    // Add scroll animation styles
    const scrollAnimationStyles = document.createElement('style');
    scrollAnimationStyles.textContent = `
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        section.scroll-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        section#home {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(scrollAnimationStyles);
}

// Utility function to throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add particle background effect
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#F8BBD9';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particle background after page load
window.addEventListener('load', () => {
    // Small delay to ensure smooth loading
    setTimeout(createParticleBackground, 1000);
});

// Add smooth reveal animations for skill items
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('skill-reveal');
    });
    
    // Add skill reveal styles
    const skillRevealStyles = document.createElement('style');
    skillRevealStyles.textContent = `
        .skill-reveal {
            opacity: 0;
            transform: scale(0.8) rotateY(180deg);
            animation: skillReveal 0.6s ease forwards;
        }
        
        @keyframes skillReveal {
            to {
                opacity: 1;
                transform: scale(1) rotateY(0deg);
            }
        }
    `;
    document.head.appendChild(skillRevealStyles);
});

// Add loading screen
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }, 1500);
});
