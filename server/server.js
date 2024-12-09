// Require the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import gamesRoutes from './routes/games.js'
import marketsRoutes from './routes/markets.js';

// Create the Fastify instance
const fastify = Fastify({
  logger: true
});

// Register the routes
fastify.register(gamesRoutes)
fastify.register(marketsRoutes)
dotenv.config()

// Register the cors plugin
fastify.register(cors, {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();