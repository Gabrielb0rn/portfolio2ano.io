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

<!-- Adicione este script antes da tag de fechamento </body> no arquivo HTML -->
<script>
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
    
    <!-- Adicione este script antes da tag de fechamento </body> no arquivo HTML -->
<script>
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

    // Adicione este estilo no arquivo CSS para o modal
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1000;
    }

    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 80%;
    }

    .modal-content img {
        width: 100%;
        height: auto;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.5em;
        color: white;
        cursor: pointer;
    }
</script>