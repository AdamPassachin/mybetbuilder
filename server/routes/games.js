export default async function gamesRoutes(fastify, opts) {
    fastify.get('/gameweek', async (request, reply) => {
        try {
            if (!process.env.RAPIDAPI_KEY) {
                throw new Error('RAPIDAPI_KEY is not set in the environment');
            }

            const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=39&season=2024&current=true', {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY
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

    fastify.get('/games', async (request, reply) => {
        try {
            const gameweek = request.query.gameweek;
            if (!gameweek) {
                reply.code(400).send({ error: 'Gameweek is required' });
                return;
            }
            const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2024&round=Regular Season - ${gameweek}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game data:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

}