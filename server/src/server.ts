import 'dotenv/config';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import Fastify from 'fastify';

// import { authRoutes } from './routes/auth';
// import { gameRoutes } from './routes/game';
// import { guessRoutes } from './routes/guess';
// import { poolRoutes } from './routes/pool';
// import { userRoutes } from './routes/user';

async function bootstrap(): Promise<void> {
  const fastify = Fastify({ logger: true });
  await fastify.register(cors, { origin: true });
  await fastify.register(jwt, { secret: process.env.JWT_SECRET });
  // await fastify.register(authRoutes);
  // await fastify.register(gameRoutes);
  // await fastify.register(guessRoutes);
  // await fastify.register(poolRoutes);
  // await fastify.register(userRoutes);
  await fastify.listen({ port: 3001, host: '0.0.0.0' });
}

bootstrap().catch(console.error);
