document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
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

    // Portfolio - Carregamento de conteúdo dinâmico
    const tabLinks = document.querySelectorAll('.tab-link');
    const content = document.getElementById('content');

    tabLinks.forEach(link => {
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

    if (tabLinks.length > 0) {
        fetchContent(tabLinks[0].getAttribute('data-tab'));
    }

    // Galeria de Imagens - Modal
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

    // Botões de Alternância de Visibilidade
    const buttons = document.querySelectorAll(".toggle-button");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const detalhes = this.previousElementSibling;
            const isHidden = detalhes.style.display === "none" || detalhes.style.display === "";

            if (isHidden) {
                detalhes.style.display = "block";
                this.textContent = "Esconder detalhes";
            } else {
                detalhes.style.display = "none";
                this.textContent = "Ver detalhes";
            }
        });
    });

    // Envio de Formulário de Contato
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        enviarFormulario();
    });
});

function enviarFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    if (nome === '' || email === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const dados = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    fetch('/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contact-form').reset();
        } else {
            alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar a mensagem:', error);
        alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
    });
}
