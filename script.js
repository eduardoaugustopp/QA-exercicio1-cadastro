document.addEventListener("DOMContentLoaded", () => {
    const loadFile = async (url, elementId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro na rede: ' + response.statusText);
            const data = await response.text();
            document.getElementById(elementId).innerHTML = data;
            console.log(`Conteúdo carregado para ${elementId}`);
            if (elementId === 'mermaid') {
                console.log("Inicializando o Mermaid...");
                mermaid.init(undefined, document.getElementById(elementId));
                console.log("Mermaid inicializado");
            }
        } catch (error) {
            console.error('Erro ao carregar o arquivo:', error);
        }
    };

    const initForm = () => {
        const form = document.getElementById('registrationForm');
        if (!form) {
            console.error('Formulário não encontrado');
            return;
        }
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            const email = document.getElementById('email').value.trim();
            const fullName = document.getElementById('fullName').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let hasError = false;

            if (!email) {
                document.getElementById('emailError').textContent = 'O e-mail é obrigatório.';
                hasError = true;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                document.getElementById('emailError').textContent = 'O e-mail não é válido.';
                hasError = true;
            }
            if (!fullName) {
                document.getElementById('fullNameError').textContent = 'O nome completo é obrigatório.';
                hasError = true;
            }
            if (!username) {
                document.getElementById('usernameError').textContent = 'O usuário é obrigatório.';
                hasError = true;
            }
            if (password.length < 8) {
                document.getElementById('passwordError').textContent = 'A senha deve ter pelo menos 8 caracteres.';
                hasError = true;
            }
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'A confirmação da senha não corresponde.';
                hasError = true;
            }
            if (!hasError) alert('Cadastro bem-sucedido! Redirecionando para a tela de login...');
        });
    };

    loadFile('formulario-cadastro.html', 'formularioCadastro').then(initForm);
    loadFile('tabela-decisao.html', 'tabelaDecisao');
    loadFile('plano-teste.html', 'planoTeste');
});
