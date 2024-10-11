// Routes for the games
export default async function gamesRoutes(fastify, opts) {

    // Route to get the current gameweek and corresponding games
    fastify.get('/games', async (request, reply) => {
        try {
            if (!process.env.RAPIDAPI_KEY) {
                throw new Error('RAPIDAPI_KEY is not set in the environment');
            }

            const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?next=10&league=39&season=2024', {
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
            console.error('Error fetching gameweek data:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
}