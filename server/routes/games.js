import { createClient } from 'redis';


// Create a Redis client
const redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Add Redis error handling
redis.on('error', err => console.error('Redis Client Error:', err));
redis.on('connect', () => console.log('Redis Client Connected'));
redis.on('reconnecting', () => console.log('Redis Client Reconnecting'));

// Connect with error handling
(async () => {
    try {
        await redis.connect();
    } catch (err) {
        console.error('Redis Connection Error:', err);
    }
})();

// Constants
const GAMEWEEK_CACHE_KEY = 'gameweek';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in ms

// Routes for the games
export default async function gamesRoutes(fastify, opts) {
    // GET Route to get the current gameweek
    fastify.get('/gameweek', async (request, reply) => {
        try {
            // Ensure Redis is connected
            if (!redis.isReady) {
                throw new Error('Redis connection is not ready');
            }

            // Check if the gameweek is cached
            const cachedGameweek = await redis.get(GAMEWEEK_CACHE_KEY)
                .catch(err => {
                    console.error('Redis get error:', err);
                    return null;
                });

            if (cachedGameweek) {
                console.log('🎯 Cache HIT - Returning cached gameweek data');
                return JSON.parse(cachedGameweek);
            }
            
            console.log('❌ Cache MISS - Fetching from API...');
            
            if (!process.env.RAPIDAPI_KEY) {
                throw new Error('RAPIDAPI_KEY is not set in the environment');
            }

            const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=39&season=2024&current=true', {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();

            // Cache the gameweek data
            await redis.set(GAMEWEEK_CACHE_KEY, JSON.stringify(data), { EX: CACHE_DURATION })
                .catch(err => console.error('Redis set error:', err));

            return data;
        } catch (error) {
            console.error('Error fetching gameweek data:', error);
            reply.status(error.message.includes('Redis') ? 503 : 500)
                .send({ error: error.message.includes('Redis') ? 
                    'Cache Service Unavailable' : 'Internal Server Error' });
        }
    });

    // Route to get the games for the current  gameweek
    fastify.get('/games', async (request, reply) => {
        try {
            const gameweek = request.query.gameweek;
            if (!gameweek) {
                reply.code(400).send({ error: 'Gameweek is required' });
                return;
            }
            const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2024&round=Regular%20Season%20-%20${gameweek}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game data:', error);
            if (error.message.includes('API request failed')) {
                reply.status(502).send({ error: 'Bad Gateway: Unable to fetch data from the external API' });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }        
    });

}