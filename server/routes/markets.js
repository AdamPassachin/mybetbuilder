const THREE_HOURS = 3 * 60 * 60;
const FIVE_MINUTES = 5 * 60;

export default async function marketsRoutes(fastify, opts) {
    fastify.get('/markets', async (request, reply) => {
        try {
            const fixture_id = request.query.fixture_id;
            if (!fixture_id) {
                reply.code(400).send({ error: 'Fixture_id is required' });
                return;
            }

            const cacheKey = `markets:${fixture_id}`;
            const cachedData = await fastify.redis.get(cacheKey);
            
            if (cachedData) {
                console.log('Cache HIT');
                const data = JSON.parse(cachedData);
                const gameTime = new Date(data.response[0].fixture.date);
                const now = new Date();
                const timeUntilGame = gameTime - now;
                const isWithinHour = timeUntilGame <= 60 * 60 * 1000;
                
                // Check if we need to update the cache duration
                const ttlLeft = await fastify.redis.ttl(cacheKey);
                if (isWithinHour && ttlLeft > FIVE_MINUTES) {
                    // Update to shorter cache duration
                    await fastify.redis.expire(cacheKey, FIVE_MINUTES);
                }
                
                return data;
            }

            // Fetch fresh data if no cache
            console.log('Cache MISS for fixture');
            const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/odds?fixture=${fixture_id}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            
            // Calculate cache duration
            const gameTime = new Date(data.response[0].fixture.date);
            const now = new Date();
            const timeUntilGame = gameTime - now;
            const isWithinHour = timeUntilGame <= 60 * 60 * 1000;
            const duration = isWithinHour ? FIVE_MINUTES : THREE_HOURS;
            
            // Cache the response
            await fastify.redis.set(cacheKey, JSON.stringify(data), 'EX', duration);
            
            return data;
        } catch (error) {
            console.error('Error fetching markets data:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
}