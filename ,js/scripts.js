document.addEventListener('DOMContentLoaded', function() {
    // Função para registrar novo usuário
    function registerUser(name, email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = { name, email, password };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Função para autenticar usuário
    function loginUser(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(user => user.email === email && user.password === password);
        return user ? true : false;
    }

    // Função para verificar se usuário está logado
    function checkLogin() {
        let isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn && window.location.pathname !== '/index.html' && window.location.pathname !== '/register.html') {
            window.location.href = 'index.html';
        }
    }

    // Função para salvar produto
    function saveProduct(name, description, price, quantity) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let existingProductIndex = products.findIndex(product => product.name === name);
        if (existingProductIndex !== -1) {
            // Atualiza produto existente
            products[existingProductIndex] = { ...products[existingProductIndex], description, price, quantity };
        } else {
            // Adiciona novo produto
            let product = { id: Date.now(), name, description, price, quantity };
            products.push(product);
        }
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Função para editar produto
    function editProduct(id, name, description, price, quantity) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            products[productIndex] = { id, name, description, price, quantity };
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

    // Função para excluir produto
    function deleteProduct(id) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Função para listar produtos
    function listProducts() {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        return products;
    }

    // Adicionar usuário admin
    function addAdminUser() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let adminExists = users.some(user => user.email === 'admin@admin.com');
        if (!adminExists) {
            users.push({ name: 'admin', email: 'admin@admin.com', password: 'admin' });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Adicionar usuário admin no carregamento da página
    addAdminUser();

    // Eventos da página de cadastro
    if (window.location.pathname.endsWith('register.html')) {
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            registerUser(name, email, password);
            alert('Usuário registrado com sucesso!');
            window.location.href = 'index.html';
        });
    }

    // Eventos da página de login
    if (window.location.pathname.endsWith('index.html')) {
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            if (loginUser(email, password)) {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'dashboard.html';
            } else {
                alert('E-mail ou senha incorretos.');
            }
        });
    }

    // Eventos da página de gerenciamento de produtos
    if (window.location.pathname.endsWith('dashboard.html')) {
        checkLogin();
        document.getElementById('productForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let name = document.getElementById('productName').value;
            let description = document.getElementById('productDescription').value;
            let price = document.getElementById('productPrice').value;
            let quantity = document.getElementById('productQuantity').value;
            saveProduct(name, description, price, quantity);
            alert('Produto salvo com sucesso!');
            displayProducts();
        });

        function displayProducts() {
            let productList = document.getElementById('productList');
            productList.innerHTML = '';
            let products = listProducts();
            products.forEach(product => {
                let productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Preço: ${product.price}</p>
                    <p>Quantidade: ${product.quantity}</p>
                    <button onclick="editProduct(${product.id}, '${product.name}', '${product.description}', ${product.price}, ${product.quantity})">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Excluir</button>
                `;
                productList.appendChild(productElement);
            });
        }

        displayProducts();
    }
});

// script.js inativo - botao branco
// documnt.addEventListener("DOMContentLoaded", function() {
//     const navLinks = document.querySelectorAll('.nav-links a');

//     navLinks.forEach(link => {
//         link.addEventListener('mouseover', () => {
//             link.style.color = '#2575fc';
//         });

//         link.addEventListener('mouseout', () => {
//             link.style.color = 'white';
//         });
//     });
// });


