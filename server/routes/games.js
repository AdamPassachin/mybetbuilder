// Constants
const GAMEWEEK_CACHE_KEY = 'gameweek:';
const GAMES_CACHE_KEY_PREFIX = 'games:';
const CACHE_DURATION = 6 * 60 * 60; // 6 hours for game data

// Routes for the games
export default async function gamesRoutes(fastify, opts) {
    // GET Route to get the current gameweek
    fastify.get('/gameweek', async (request, reply) => {
        try {

            // Get league ID from request
            const leagueId = request.query.leagueId;
            if (!leagueId) {
                reply.code(400).send({ error: 'League is required' });
                return;
            }

            // Ensure Redis is connected
            if (!fastify.redis.isReady) {
                throw new Error('Redis connection is not ready');
            }

            // Cache key to include league ID
            const cacheKey = `${GAMEWEEK_CACHE_KEY}${leagueId}`;
            
            // Check if the gameweek is cached
            const cachedGameweek = await fastify.redis.get(cacheKey)
                .catch(err => {
                    console.error('Redis get error:', err);
                    return null;
                });
            if (cachedGameweek) {
                return JSON.parse(cachedGameweek);
            }
            
            //Check if RAPIDAPI_KEY is set
            if (!process.env.RAPIDAPI_KEY) {
                throw new Error('RAPIDAPI_KEY is not set in the environment');
            }
            
            // Fetch gameweek data from API
            const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=${leagueId}&season=2024&current=true`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST    
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();

            // Update cache with league-specific key
            await fastify.redis.set(cacheKey, JSON.stringify(data), { EX: CACHE_DURATION })
                .catch(err => console.error('Redis set error:', err));

            return data;
        } catch (error) {
            console.error('Error fetching gameweek data:', error);
            reply.status(error.message.includes('Redis') ? 503 : 500)
                .send({ error: error.message.includes('Redis') ? 
                    'Cache Service Unavailable' : 'Internal Server Error' });
        }
    });

    // Route to get the games for the current gameweek
    fastify.get('/games', async (request, reply) => {
        try {
            const gameweek = request.query.gameweek;
            const leagueId = request.query.leagueId;
            if (!gameweek || !leagueId) {
                reply.code(400).send({ error: 'Gameweek and leagueId are required' });
                return;
            }

            // Ensure Redis is connected
            if (!fastify.redis.isReady) {
                throw new Error('Redis connection is not ready');
            }

            // Cache key for games only
            const gamesCacheKey = `${GAMES_CACHE_KEY_PREFIX}${leagueId}-${gameweek}`;

            // Get cached games
            const cachedGames = await fastify.redis.get(gamesCacheKey).catch(err => {
                console.error('Redis get games error:', err);
                return null;
            });

            if (cachedGames) {
                return JSON.parse(cachedGames);
            }

            if (!process.env.RAPIDAPI_KEY) {
                throw new Error('RAPIDAPI_KEY is not set in the environment');
            }

            const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=2024&round=Regular%20Season%20-%20${gameweek}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            // Cache the game data
            if (data.response && data.response.length > 0) {
                await fastify.redis.set(gamesCacheKey, JSON.stringify(data), { 
                    EX: CACHE_DURATION 
                }).catch(err => console.error('Redis set games error:', err));
            }

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