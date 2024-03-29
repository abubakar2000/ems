import { FastifyInstance } from 'fastify';

export default async (instance: FastifyInstance) => {
  instance.get('/quotation', async (request, reply) => {
    return { hello: 'world' };
  });

  instance.post('/quotation', async (request, reply) => {
    return { hello: 'world' };
  });
};
