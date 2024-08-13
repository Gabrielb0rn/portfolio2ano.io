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

// portfolio "galeria"

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.tab-link');
    const content = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const tab = this.getAttribute('data-tab');
            fetchContent(tab);
        });
    });

    function fetchContent(tab) {
        fetch(`${tab}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                content.innerHTML = `<p>Ocorreu um erro ao carregar o conteúdo: ${error.message}</p>`;
            });
    }

    // Carregar a primeira aba por padrão
    if (links.length > 0) {
        fetchContent(links[0].getAttribute('data-tab'));
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".image-gallery a");

    images.forEach(image => {
        image.addEventListener("click", function(event) {
            event.preventDefault();
            const src = this.querySelector("img").getAttribute("src");
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <img src="${src}" alt="">
                </div>
            `;
            document.body.appendChild(modal);

            const closeButton = modal.querySelector(".close-button");
            closeButton.addEventListener("click", () => {
                modal.remove();
            });

            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
});
