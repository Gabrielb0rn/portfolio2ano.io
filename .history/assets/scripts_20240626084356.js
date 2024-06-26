//portfolio 

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
        fetch(tab + '.html')
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                content.innerHTML = `<p>Ocorreu um erro ao carregar o conteúdo: ${error}</p>`;
            });
    }

    // Carregar a primeira aba por padrão
    if (links.length > 0) {
        fetchContent(links[0].getAttribute('data-tab'));
    }
});