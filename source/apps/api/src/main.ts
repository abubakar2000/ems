import Fastify from 'fastify';
import { app } from './app/app';
import FastifyCors from '@fastify/cors';
import prismaClient from './app/clients/prisma.client';

const protocol = process.env.PROTOCOL ?? 'http';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
server.register(app);
server.register(FastifyCors, {
  origin: '*',
});

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    process.on('SIGINT', async () => {
      await server.close();
      await prismaClient().$disconnect();
    });
    console.log(`[ ready ] ${protocol}://${host}:${port}`);
    console.log(server.printRoutes());
  }
});
