//script do cadastro.html
document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('formCadastro');

  if (formCadastro) {
    formCadastro.addEventListener('submit', async function(event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const confirmaSenha = document.getElementById('confirmaSenha').value;

      if (senha !== confirmaSenha) {
        alert('As senhas não coincidem.');
        return;
      }

      try {
        const resposta = await fetch('/api/usuarios/cadastro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, senha })
        });

        if (resposta.ok) {
          alert('Cadastro realizado com sucesso!');
          window.location.href = 'login.html';
        } else {
          const msg = await resposta.text();
          alert(`Erro: ${msg}`);
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao conectar com o servidor.');
      }
    });
  }
});
//.

//script do perfil.html
document.addEventListener('DOMContentLoaded', () => {
  const btnAlterarFoto = document.getElementById('btnAlterarFoto');
  const btnCriarJogo = document.getElementById('btnCriarJogo');

  if (btnAlterarFoto) {
    btnAlterarFoto.addEventListener('click', () => {
      alert("Aqui você poderá alterar a foto de perfil.");
    });
  }

  if (btnCriarJogo) {
    btnCriarJogo.addEventListener('click', () => {
      window.location.href = "jogos/criarJogo.html";
    });
  }
});
//

