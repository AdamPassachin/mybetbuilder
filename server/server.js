// Require the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { createClient } from 'redis'
import gamesRoutes from './routes/games.js'
import marketsRoutes from './routes/markets.js'
import currencyRoutes from './routes/currency.js'

// Create the Fastify instance
const fastify = Fastify({
  logger: true
});

// Create Redis client
const redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Add Redis error handling
redis.on('error', err => console.error('Redis Client Error:', err));
redis.on('connect', () => console.log('Redis Client Connected'));
redis.on('reconnecting', () => console.log('Redis Client Reconnecting'));

// Decorate Fastify with redis client
fastify.decorate('redis', redis);

// Connect Redis before starting the server
const start = async () => {
    try {
        await redis.connect();
        
        // Register plugins
        await fastify.register(cors, {
            origin: ['http://localhost:5173', 'http://localhost:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        })

        // Register routes after Redis is connected
        await fastify.register(gamesRoutes)
        await fastify.register(marketsRoutes)
        await fastify.register(currencyRoutes)

        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

dotenv.config()
start();