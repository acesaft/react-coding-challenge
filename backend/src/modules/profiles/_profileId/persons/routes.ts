import { userAccountId } from '@/shared/constants';
import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getPersons);
    instance.register(createPerson);
};

const getPersons: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { profileId: string } }>) => {
        await randomSleep();
        return await prisma.person.findMany({
            where: {
                profileId: request.params.profileId
            }
        });
    });
};

const createPerson: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.post('/', async (request: FastifyRequest<{ Params: { profileId: string }, Body: Prisma.PersonCreateInput }>) => {
        await randomSleep();
        return await prisma.person.create({
            data: {
                ...request.body,
                profile: {
                    connect: {
                        id: request.params.profileId
                    }
                },
                userAccount: {
                    connect: {
                        id: userAccountId
                    }
                }
            }
        });
    });
};

export default root;
