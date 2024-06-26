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