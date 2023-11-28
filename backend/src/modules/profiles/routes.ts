import { userAccountId } from '@/shared/constants';
import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getProfiles);
    instance.register(createProfile);
};

const getProfiles: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async () => {
        await randomSleep();
        return await prisma.profile.findMany({
            where: {
                userAccountId: userAccountId
            },
            include: {
                persons: true,
                paymentMethods: true,
                addresses: {
                    include: {
                        meters: true
                    }
                }
            }
        });
    });
};

const createProfile: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.post('/', async (request: FastifyRequest<{ Body: Prisma.ProfileCreateInput }>) => {
        await randomSleep();
        return await prisma.profile.create({
            data: {
                ...request.body,
                userAccount: {
                    connect: {
                        id: userAccountId
                    }
                }
            },
            include: {
                persons: true,
                paymentMethods: true,
                addresses: {
                    include: {
                        meters: true
                    }
                }
            }
        })
    });
};

export default root;
