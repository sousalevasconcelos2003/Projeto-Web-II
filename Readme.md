# Projeto de Programação Web II

## Sobre o projeto

* Descrição do Projeto:
Este projeto consiste em um site interativo de jogos desenvolvido como parte da disciplina Programação Web II. A proposta é permitir que os usuários possam:

- Criar uma conta no sistema
- Fazer login com segurança
- Personalizar o perfil, incluindo alteração de foto
- Criar seus próprios jogos e armazená-los no sistema
- Visualizar e compartilhar seus jogos com outras pessoas


## Tecnologias usadas

- **Frontend:**
  - React.js (com hooks e CSS Modules)
  - Axios (para comunicação HTTP com backend)

- **Backend:**
  - Node.js com Express
  - MongoDB com Mongoose 

- **Outros:**
  - SessionStorage no browser para armazenar dados do usuário logado
  - API REST para cadastro, login, cadastro de jogos e rankings

---

## Funcionalidades principais

- Cadastro e login de usuários com validação básica
- Listagem e seleção de jogos disponíveis
- Modalidades de jogo:
  - Quiz: perguntas de múltipla escolha
  - Memória: jogo da memória
  - Associação: jogo de associação (funcionalidade básica)
- Registro de resultados (pontos, erros, tempo) no ranking
- Listagem do ranking com nomes dos usuários e seus resultados ordenados

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- MongoDB rodando localmente ou em um serviço na nuvem

### Backend

1. Clone o repositório
2. Entre na pasta do backend
3. Instale as dependências:

```bash

npm install

```

* Configure a conexão com o MongoDB no arquivo de configuração (ex: .env ou diretamente no código)

* Inicie o servidor:

```bash

npm run dev

```

* O backend ficará disponível em http://localhost:3001.

### Frontend

1. Entre na pasta "frontend"  instale as dependências:

```bash

npm install

```

* Inicie a aplicação:

```bash

npm run dev

```

* No terminal aparecerá um link para visualizar a aplicação.


