import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getProfile);
    instance.register(updateProfile);
    instance.register(deleteProfile);
};

const getProfile: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { profileId: string } }>) => {
        await randomSleep();
        return await prisma.profile.findUnique({
            where: {
                id: request.params.profileId
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

const updateProfile: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.put('/', async (request: FastifyRequest<{ Params: { profileId: string }, Body: Prisma.ProfileUpdateInput }>) => {
        await randomSleep();
        return await prisma.profile.update({
            where: {
                id: request.params.profileId
            },
            data: request.body,
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

const deleteProfile: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.delete('/', async (request: FastifyRequest<{ Params: { profileId: string } }>) => {
        await randomSleep();
        return await prisma.profile.delete({
            where: {
                id: request.params.profileId
            }
        });
    });
};

export default root;
