import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getAddress);
    instance.register(updateAddress);
    instance.register(deleteAddress);
};

const getAddress: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async (request: FastifyRequest<{ Params: { addressId: string } }>) => {
        await randomSleep();
        return await prisma.address.findUnique({
            where: {
                id: request.params.addressId
            },
            include: {
                meters: true
            }
        });
    });
};

const updateAddress: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.put('/', async (request: FastifyRequest<{ Params: { addressId: string }, Body: Prisma.AddressUpdateInput }>) => {
        await randomSleep();
        return await prisma.address.update({
            where: {
                id: request.params.addressId
            },
            data: request.body,
            include: {
                meters: true
            }
        });
    });
};

const deleteAddress: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.delete('/', async (request: FastifyRequest<{ Params: { addressId: string } }>) => {
        await randomSleep();
        return await prisma.address.delete({
            where: {
                id: request.params.addressId
            }
        });
    });
};

export default root;
