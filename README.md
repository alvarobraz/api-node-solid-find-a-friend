<p align="center">
  <a href="https://fastify.dev/" target="blank"><img src="https://fastify.dev/img/logos/fastify-white.svg" width="200" alt="Fastify Logo" /></a>
</p>

<p align="center">
  Aplicação em Node.js/TypeScript/Fastify - FindAFriend API - Adoção de pets 🐾
  <br>
  <br>

  <img alt="Language count" src="https://img.shields.io/github/repo-size/alvarobraz/api-node-solid-find-a-friend"/>

  <a href="https://www.linkedin.com/in/alvarobraz/">
    <img alt="Made by alvarobraz" src="https://img.shields.io/badge/made%20by-alvarobraz-%237519C1">
  </a>

  <a href="https://github.com/alvarobraz/api-node-solid-find-a-friend/commits/main/">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alvarobraz/api-node-solid-find-a-friend">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/alvarobraz/api-node-solid-find-a-friend">
</p>

---

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0; 
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#estrutura">Estrurura</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requerimentos">Requerimentos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a>
</p>

<br>

## :dart: Sobre ##

A **FindAFriend API** é uma aplicação backend robusta e escalável, projetada para facilitar a adoção de animais. A API permite que organizações (ORGs) se cadastrem, gerenciem pets disponíveis para adoção e conectem esses animais a potenciais adotantes. Os usuários podem explorar uma lista de pets disponíveis em sua cidade, filtrá-los por características específicas e visualizar detalhes para entrar em contato com a ORG responsável via WhatsApp.

A aplicação foi desenvolvida com base em princípios SOLID, utilizando tecnologias modernas como Fastify, Prisma ORM, JWT para autenticação e Zod para validação de dados. Suporta funcionalidades como cadastro e login de ORGs, registro de pets com vinculação a uma ORG, listagem de pets por cidade com filtros opcionais e visualização de detalhes de cada pet. Além disso, a API implementa práticas avançadas como TDD, testes unitários e e2e, RBAC, Refresh Token e padrões de design, garantindo um código organizado, testável e de fácil manutenção.

## :rocket: Tecnologias ##

As seguintes tecnologias foram utilizadas no desenvolvimento do projeto **FindAFriend API**:

- **[Node.js](https://nodejs.org/en/docs/)**: Ambiente de execução JavaScript.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que adiciona tipagem estática.
- **[Fastify](https://www.fastify.io/)**: Framework web rápido e de baixo overhead para Node.js.
- **[Prisma](https://www.prisma.io/)**: ORM moderno para Node.js e TypeScript, facilitando a interação com bancos de dados.
- **[Zod](https://zod.dev/)**: Biblioteca de declaração e validação de schemas TypeScript.
- **[@fastify/jwt](https://www.npmjs.com/package/@fastify/jwt)**: Plugin para Fastify para autenticação com JWT.
- **[@fastify/cookie](https://www.npmjs.com/package/@fastify/cookie)**: Plugin para Fastify para gerenciar cookies.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: Biblioteca para hash e comparação segura de senhas.
- **[Docker](https://www.docker.com/)**: Plataforma para containerização de aplicações.
- **[Docker Compose](https://docs.docker.com/compose/)**: Ferramenta para definir e gerenciar aplicações multi-container.
- **[Vitest](https://vitest.dev/)**: Framework de testes rápido e integrado com Vite, utilizado para testes unitários e e2e.
- **[Supertest](https://www.npmjs.com/package/supertest)**: Biblioteca para testar APIs HTTP.

## :file_folder: Estrutura ##
```
.
├── docker-compose.yml
├── LICENSE
├── package.json
├── package-lock.json
├── prisma
│   ├── migrations
│   │   ├── 20250715194048_create_schema_project
│   │   │   └── migration.sql
│   │   ├── 20250716170344_add_role_to_orgs
│   │   │   └── migration.sql
│   │   ├── 20250717191418_change_state_to_enum
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── vitest-environment-prisma
│       └── prisma-test-environment.ts
├── README.md
├── src
│   ├── app.ts
│   ├── env
│   │   └── index.ts
│   ├── http
│   │   ├── controllers
│   │   │   ├── orgs
│   │   │   │   ├── authenticate.ts
│   │   │   │   ├── create-org.spec.ts
│   │   │   │   ├── create-org.ts
│   │   │   │   ├── org-profile.ts
│   │   │   │   ├── refresh.ts
│   │   │   │   ├── routes.ts
│   │   │   │   ├── search-orgs.ts
│   │   │   │   └── update-org-profile.ts
│   │   │   └── pets
│   │   │       ├── adopt-pet.ts
│   │   │       ├── create-pet.spec.ts
│   │   │       ├── create-pet.ts
│   │   │       ├── get-pet.ts
│   │   │       ├── routes.ts
│   │   │       └── search-pets.ts
│   │   └── middlewares
│   │       ├── verify-jwt.ts
│   │       └── verify-user-role.ts
│   ├── lib
│   │   └── prisma.ts
│   ├── repositories
│   │   ├── in-memory
│   │   │   ├── in-memory-orgs-repository.ts
│   │   │   └── in-memory-pets-repository.ts
│   │   ├── orgs-repository.ts
│   │   ├── pets-repository.ts
│   │   └── prisma
│   │       ├── prisma-orgs-repositories.ts
│   │       └── prisma-pets-repositories.ts
│   ├── server.ts
│   ├── @types
│   │   └── fastify-jwt.d.ts
│   ├── use-cases
│   │   ├── adopt-pet.spec.ts
│   │   ├── adot-pet.ts
│   │   ├── authenticate.spec.ts
│   │   ├── authenticate.ts
│   │   ├── create-org.spec.ts
│   │   ├── create-org.ts
│   │   ├── create-pet.spec.ts
│   │   ├── create-pet.ts
│   │   ├── errors
│   │   │   ├── invalid-credentials-error.ts
│   │   │   ├── invalid-state-errors.ts
│   │   │   ├── org-already-exists-error.ts
│   │   │   └── resource-not-found-error.ts
│   │   ├── factories
│   │   │   ├── make-authenticate-use-case.ts
│   │   │   ├── make-create-org-use-case.ts
│   │   │   ├── make-create-pet-use-case.ts
│   │   │   ├── make-fetch-orgs-by-state-and-city-use-case.ts
│   │   │   ├── make-find-pets-by-city-use-case.ts
│   │   │   ├── make-get-org-profile-use.case.ts
│   │   │   ├── make-get-pet-by-id-use-case.ts
│   │   │   ├── make-update-org-use-case.ts
│   │   │   └── make-update-pet-use-case.ts
│   │   ├── fetch-orgs-by-state-and-city.spec.ts
│   │   ├── fetch-orgs-by-state-and-city.ts
│   │   ├── find-pets-by-city.spec.ts
│   │   ├── find-pets-by-city.ts
│   │   ├── get-org-profile.spec.ts
│   │   ├── get-org-profile.ts
│   │   ├── get-pet.spec.ts
│   │   ├── get-pet.ts
│   │   ├── update-org-profile.spec.ts
│   │   └── update-org-profile.ts
│   └── utils
│       └── states.ts
├── tsconfig.json
└── vite.config.js
```
## :memo: Requisitos do Projeto ##

Este projeto implementa as seguintes **funcionalidades** e **regras de negócio**:

## Regras da aplicação

- [X] Deve ser possível cadastrar um pet
- [X] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [X] Deve ser possível filtrar pets por suas características
- [X] Deve ser possível visualizar detalhes de um pet para adoção
- [X] Deve ser possível se cadastrar como uma ORG
- [X] Deve ser possível realizar login como uma ORG

## Regras de negócio

- [X] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [X] Uma ORG precisa ter um endereço e um número de WhatsApp
- [X] Um pet deve estar ligado a uma ORG
- [X] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [X] Todos os filtros, além da cidade, são opcionais
- [X] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## :white_check_mark: Requerimentos ##

- [Node.js](https://nodejs.org/en/) (versão 20.x ou superior recomendada)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [Docker](https://www.docker.com/) (para containerização da aplicação e banco de dados)
- [Docker Compose](https://docs.docker.com/compose/) (para gerenciar serviços multi-container)

## :checkered_flag: Começando ##

Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

```bash
# Clone este repositório
$ git clone https://github.com/alvarobraz/api-node-solid-find-a-friend.git

# Acesse o diretório do projeto
$ cd api-node-solid-find-a-friend

# Node version
$ nvm use 20.19.3

# Instale as dependências
$ npm install

# Instale o docker em sua máquina
- [docker](https://docs.docker.com/get-started/get-docker/)
$ sudo docker compose up -d

# Execute as migrations do banco de dados
$ npx prisma migrate dev

# Inicie o servidor em modo de desenvolvimento
$ npm run start:dev # Se você tem um script 'dev' configurado no package.json
# ou
$ npm start # Se o seu script de inicialização principal for 'start'

# O servidor estará disponível em http://localhost:3333/ (ou na porta configurada em seu .env)