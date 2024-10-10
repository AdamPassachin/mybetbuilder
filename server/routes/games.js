// Routes for the games
export default async function gamesRoutes(fastify, opts) {
    // Route to get the current gameweek
    fastify.get('/gameweek', async (request, reply) => {
        try {
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
            return data;
        } catch (error) {
            console.error('Error fetching gameweek data:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
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