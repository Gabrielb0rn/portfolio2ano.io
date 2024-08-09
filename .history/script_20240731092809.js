/* scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('#sidebar nav ul li a');

    // Inicializa as seções com animações GSAP
    gsap.to(sections, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3
    });

    // Configura animações ao rolar a página
    sections.forEach(section => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animação ao clicar nos links do menu
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            gsap.to(window, {
                scrollTo: { y: targetSection, offsetY: 60 },
                duration: 1,
                ease: 'power2.inOut'
            });

            // Animação de transição entre seções
            gsap.fromTo(targetSection, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.3
            });
        });
    });
});
