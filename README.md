<p align="center">
Este projeto foi feito no desafio backend da CodeChallenges. <br/>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Express
- Nodejs
- Typescript
- Prisma
- Zod
- Vitest
- Swagger

## 💻 Projeto

Neste projeto eu realizei o backend de uma aplicação para gerenciamento de enquetes.

---

## 🤔 Instruções

### Variáveis de Ambiente:

Para rodar o backend, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

- `PORT=3333`
- `DATABASE_URL="postgresql://[POSTGRESQL_USERNAME]:[POSTGRESQL_PASSWORD]@localhost:5433/[POSTGRESQL_DATABASE]?schema=public"`

### Primeiros passos:

Primeiramente baixe o arquivo back-end no [GitHub](https://github.com/pdro-h0/back-dev-challenge), no seu terminal, execute o seguinte comando na raiz da pasta criada:

`npm install`

E então rode o comando do [docker-compose](https://docs.docker.com/compose/):

`docker-compose up -d`
ou
`docker compose up -d`

Em seguida, rode:
`npx prisma generate`
e
`npx prisma db push`

Por fim:

`npm run dev`

---

### Requisitos funcionais

- Deve ser possível criar uma enquete
- Deve ser possível editar uma enquete
- Deve ser possível excluir uma enquete
- Deve ser possível listar todas as enquetes
- Deve ser possível listar as enquetes por status
- Deve ser possível adicionar quantas opções quiser na enquete

---

### Regras de negócio

- A enquete deve ter um título
- A enquete deve ter uma data de início
- A enquete deve ter uma data de término
- A enquete pode ter o status `não iniciado/iniciado/em andamento/finalizado`
- A enquete deve ter no mínimo 3 opções

---

Feito com ♥ by Pedro Henrique
