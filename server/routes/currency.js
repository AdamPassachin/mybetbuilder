export default async function currencyRoutes(fastify, opts) {
    fastify.get('/currency', async (request, reply) => {
        try {
            const response = await fetch('https://ipapi.co/currency/json/')
            if(!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            reply.status(500).send({ error: 'Failed to fetch currency' });
        }
    });
}