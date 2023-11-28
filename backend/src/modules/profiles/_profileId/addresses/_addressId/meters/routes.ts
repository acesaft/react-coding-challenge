import { userAccountId } from '@/shared/constants';
import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getMeters);
    instance.register(createMeter);
};

const getMeters: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { addressId: string } }>) => {
        await randomSleep();
        return await prisma.meter.findMany({
            where: {
                addressId: request.params.addressId
            }
        });
    });
};

const createMeter: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.post('/', async (request: FastifyRequest<{ Params: { profileId: string; addressId: string }, Body: Prisma.MeterCreateInput }>) => {
        await randomSleep();
        return await prisma.meter.create({
            data: {
                ...request.body,
                address: {
                    connect: {
                        id: request.params.addressId
                    }
                },
                profile: {
                    connect: {
                        id: request.params.profileId
                    }
                },
                userAccount: {
                    connect: {
                        id: userAccountId
                    }
                },
            }
        });
    });
};

export default root;
