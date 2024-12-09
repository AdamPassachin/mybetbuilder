// Routes for the markets
export default async function marketsRoutes(fastify, opts) {
    fastify.get('/markets', async (request, reply) => {
        try {
            const fixture_id = request.query.fixture_id;
            if (!fixture_id) {
                reply.code(400).send({ error: 'Fixture_id is required' });
                return;
            }
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
            return data;
        } catch (error) {
            console.error('Error fetching markets data:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
}