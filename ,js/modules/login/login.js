const predefinedUser = {
    name: 'Predefined User',
    email: 'admin@admin',
    password: '1234'
};

localStorage.setItem('predefinedUser', JSON.stringify(predefinedUser));

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Recupera os dados do localStorage
    const storedUser = JSON.parse(localStorage.getItem('user')); // Usuário registrado
    const storedPredefinedUser = JSON.parse(localStorage.getItem('predefinedUser')); // Usuário pré-registrado

    // Verifica se as credenciais estão corretas (usuário registrado ou pré-definido)
    if ((storedUser && storedUser.email === email && storedUser.password === password) ||
        (storedPredefinedUser && storedPredefinedUser.email === email && storedPredefinedUser.password === password)) {
        
        // Armazena no sessionStorage que o usuário está logado
        sessionStorage.setItem('isLoggedIn', 'true');
        alert('Login bem-sucedido!');
        window.location.href = '1poslogin.html';
    } else {
        alert('Email ou senha incorretos.');
    }
});