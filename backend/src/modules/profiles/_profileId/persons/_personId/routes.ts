import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getPerson);
    instance.register(updatePerson);
    instance.register(deletePerson);
};

const getPerson: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { personId: string } }>) => {
        await randomSleep();
        return await prisma.person.findUnique({
            where: {
                id: request.params.personId
            }
        });
    });
};

const updatePerson: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.put('/', async (request: FastifyRequest<{ Params: { personId: string }, Body: Prisma.PersonUpdateInput }>) => {
        await randomSleep();
        return await prisma.person.update({
            where: {
                id: request.params.personId
            },
            data: request.body
        });
    });
};

const deletePerson: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.delete('/', async (request: FastifyRequest<{ Params: { personId: string } }>) => {
        await randomSleep();
        return await prisma.person.delete({
            where: {
                id: request.params.personId
            }
        });
    });
};

export default root;
