# API-pagos


## DATABASE

You should create database in mysql


```bash
# use the database name of config file in /api/db/config or chngae it
$ create database payments_users

```
## Build Setup

```bash
# install dependencies
$ yarn install

# Sequelize migration and population database

# move to folder sequelize
$ cd api/db
# migration comand - this will create the tables in db
$ npx sequelize db:migrate
#populate tables comand
$ npx sequelize db:seed:all


# serve with hot reload at localhost:3000
$ yarn start
```




