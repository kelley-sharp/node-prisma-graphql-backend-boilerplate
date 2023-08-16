# node-prisma-graphql-backend-boilerplate
Boilerplate for a Node, Prisma, and GraphQL backend using Todo as an example entity.


## License & Purpose

MIT License. This is something I've used in production before with success that I found useful for quickly bootstrapping GraphQL APIs. You can fork and clone this without giving me any credit for anything. 

If you like it, you can star the repo ⭐️ or follow me on GitHub.

Feel free to make an issue or PR if you want to suggest ideas / fixes.

## About

This configuration is a backend GraphQL API boilerplate with the following pieces:

- [Docker](https://www.docker.com/) as the container service to run your postgres server without installing postgres
- [Node.js](https://nodejs.org/en/) (Long-Term-Support Version) as the run-time environment to run JavaScript
- [Express.js](https://expressjs.com/) as the server framework / controller layer
- [GraphQL](https://graphql.org/) as the query language for your API, and a server-side runtime for running queries
- [Yoga](https://the-guild.dev/graphql/yoga-server) as a lightweight GraphQL server
- [Prisma](https://www.prisma.io/) as an ORM that works well with Node.js and Typescript 
- [Pothos](https://pothos-graphql.dev/) a plugin based GraphQL schema builder for typescript
- [ESLint](https://eslint.org/) a linter for your code editor
- [Prettier](https://prettier.io/) an opinionated code formatter

## Getting Started

0. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Linux equivalent](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
1. Clone/fork the repo, navigate to it in your terminal and run `pnpm install`
2. Define POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD and DATABASE_URL in an .env file within the root directory. Read more about these variables [here](https://hub.docker.com/_/postgres)
```
  //example .env file contents
  POSTGRES_DB="todolistapp"
  POSTGRES_USER="username"
  POSTGRES_PASSWORD="password"
  DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
```
4. Run `docker-compose up` to start the container for your postgres server 
5. Server is accessible at http://localhost:8000. You can change the PORT in `server.ts`
4. In a new tab, run `pnpm prisma generate` which uses the contents of `schema.prisma` to generate your [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)
5. Prisma comes with Prisma Studio, a GUI to read and manipulate data in your database from the browser. Run `pnpm prisma studio` to open
