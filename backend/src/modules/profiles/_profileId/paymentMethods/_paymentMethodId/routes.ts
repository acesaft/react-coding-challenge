import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getPaymentMethod);
    instance.register(updatePaymentMethod);
    instance.register(deletePaymentMethod);
};

const getPaymentMethod: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { paymentMethodId: string } }>) => {
        await randomSleep();
        return await prisma.paymentMethod.findUnique({
            where: {
                id: request.params.paymentMethodId
            }
        });
    });
};

const updatePaymentMethod: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.put('/', async (request: FastifyRequest<{ Params: { paymentMethodId: string }, Body: Prisma.PaymentMethodUpdateInput }>) => {
        await randomSleep();
        return await prisma.paymentMethod.update({
            where: {
                id: request.params.paymentMethodId
            },
            data: request.body
        });
    });
};

const deletePaymentMethod: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.delete('/', async (request: FastifyRequest<{ Params: { paymentMethodId: string } }>) => {
        await randomSleep();
        return await prisma.paymentMethod.delete({
            where: {
                id: request.params.paymentMethodId
            }
        });
    });
};

export default root;
