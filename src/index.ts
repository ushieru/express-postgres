require('dotenv').config();
import express, { Response, Request, NextFunction } from "express";
import knex from "knex";
import { User } from "./models/User";
console.log(process.env.DATABASE_URL)
const PORT = process.env.PORT || 3030
const server = express()
const database = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
});

server.use(express.json())

server.get('/users', (_, response, next) => {
    database<User>('user')
        .select('*')
        .then(users => response.json(users))
        .catch(err => next(err))
})

server.post('/users', (request, response, next) => {
    const { name, lastname } = request.body;
    database<User>('user')
        .insert({ name, lastname })
        .returning('*')
        .then(user => response.json(user))
        .catch(err => next(err))
})

server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log('Error Logger')
    console.log(error.message)
    response.status(500).json({})
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}/ 🚀🚀🚀`))