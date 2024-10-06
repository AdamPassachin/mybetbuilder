// Require the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
dotenv.config()

const fastify = Fastify({
  logger: true
});

// Register the CORS plugin
fastify.register(cors, {
    // Configure CORS options
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })

// API to fetch current gameweek
fastify.get('/gameweek', async (request, reply) => {
    const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=39&season=2024&current=true', {
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY
        }
    });

    const data = await response.json();
    return data;
});

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