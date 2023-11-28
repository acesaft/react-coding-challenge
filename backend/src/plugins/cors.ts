import cors, { FastifyCorsOptions } from '@fastify/cors';
import fp from 'fastify-plugin';

/**
 * This plugins adds cors to handle http errors
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (router) => {
  router.register(cors, { origin: 'http://localhost:3000' })
})
