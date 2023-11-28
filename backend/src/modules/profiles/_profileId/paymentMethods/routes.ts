import { userAccountId } from '@/shared/constants';
import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getPaymentMethods);
    instance.register(createPaymentMethod);
};

const getPaymentMethods: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { profileId: string } }>) => {
        await randomSleep();
        return await prisma.paymentMethod.findMany({
            where: {
                profileId: request.params.profileId
            }
        });
    });
};

const createPaymentMethod: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.post('/', async (request: FastifyRequest<{ Params: { profileId: string }, Body: Prisma.PaymentMethodCreateInput }>) => {
        await randomSleep();
        return await prisma.paymentMethod.create({
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
