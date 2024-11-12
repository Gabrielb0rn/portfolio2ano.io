const termsModal = document.getElementById('terms-modal');
        const privacyModal = document.getElementById('privacy-modal');
        const openTerms = document.getElementById('open-terms');
        const openPrivacy = document.getElementById('open-privacy');
        const closeTerms = document.getElementById('close-terms');
        const closePrivacy = document.getElementById('close-privacy');

        openTerms.onclick = function() {
            termsModal.style.display = 'block';
        };
        openPrivacy.onclick = function() {
            privacyModal.style.display = 'block';
        };
        closeTerms.onclick = function() {
            termsModal.style.display = 'none';
        };
        closePrivacy.onclick = function() {
            privacyModal.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target === termsModal) {
                termsModal.style.display = 'none';
            } else if (event.target === privacyModal) {
                privacyModal.style.display = 'none';
            }
        };

        // Validação de formulário
        document.getElementById('register-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário

            // Captura os valores dos inputs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Verifica se as senhas coincidem
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            // Salva os dados no localStorage
            const user = {
                name: name,
                email: email,
                telefone: telefone,
                password: password
            };

            localStorage.setItem('user', JSON.stringify(user));

            alert('Usuário registrado com sucesso!');
            window.location.href = 'login.html';
        });