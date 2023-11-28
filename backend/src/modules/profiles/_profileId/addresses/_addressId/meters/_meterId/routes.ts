import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getMeter);
    instance.register(updateMeter);
    instance.register(deleteMeter);
};

const getMeter: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { meterId: string } }>) => {
        await randomSleep();
        return await prisma.meter.findUnique({
            where: {
                id: request.params.meterId
            }
        });
    });
};

const updateMeter: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.put('/', async (request: FastifyRequest<{ Params: { meterId: string }, Body: Prisma.MeterUpdateInput }>) => {
        await randomSleep();
        return await prisma.meter.update({
            where: {
                id: request.params.meterId
            },
            data: request.body
        });
    });
};

const deleteMeter: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.delete('/', async (request: FastifyRequest<{ Params: { meterId: string } }>) => {
        await randomSleep();
        return await prisma.meter.delete({
            where: {
                id: request.params.meterId
            }
        });
    });
};

export default root;
