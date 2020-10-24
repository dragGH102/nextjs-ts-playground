Thanks to https://github.com/jpedroschmitz/typescript-nextjs-starter for providing the typescript starter code

At the current stage, this is an enhanced version of the nextjs "get started" tutorial with:
- using typescript
- minor customizations
- mysql connection & auth

a .env file with 

> TOKEN_SECRET="this-is-a-secret-value-with-at-least-32-characters"

is required

# DB creation commands

    create database testdb;
    use testdb;
    CREATE TABLE `users` (
        `id` VARCHAR(45) NOT NULL,
        `createdAt` DATETIME NOT NULL,
        `email` VARCHAR(45),
        `hash` VARCHAR(255),
        `salt` VARCHAR(45),
        KEY `email` (`email`) USING BTREE,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;

## 🚀 Getting started

First of all you need to have `node` and `npm` (or `yarn`) installed on your machine.

Then, you can clone this repository and run the following commands inside the project folder:

1. `npm install` or `yarn`;
2. `yarn dev`;

To view the project you can open `http://localhost:3000`.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
