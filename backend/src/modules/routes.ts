import { userAccountId } from '@/shared/constants';
import prisma from '@/shared/prisma';
import { randomSleep } from '@/shared/utils';
import { Prisma } from '@prisma/client';
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify';

const root: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.register(getUser);
    instance.register(updateUser);
    instance.register(deleteUser);
};

const getUser: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.get('/', async () => {
        await randomSleep();
        return await prisma.userAccount.findUnique({
            where: {
                id: userAccountId
            },
            include: {
                profiles: {
                    include: {
                        persons: true,
                        paymentMethods: true,
                        addresses: {
                            include: {
                                meters: true
                            }
                        }
                    }
                }
            }
        });
    });
};

const updateUser: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.put('/', async (request: FastifyRequest<{ Body: Prisma.UserAccountUpdateInput }>) => {
        await randomSleep();
        return await prisma.userAccount.update({
            where: {
                id: userAccountId
            },
            data: request.body,
            include: {
                profiles: {
                    include: {
                        persons: true,
                        paymentMethods: true,
                        addresses: {
                            include: {
                                meters: true
                            }
                        }
                    }
                }
            }
        });
    });
};

const deleteUser: FastifyPluginAsync = async (instance: FastifyInstance) => {
    instance.delete('/', async () => {
        await randomSleep();
        return await prisma.userAccount.delete({
            where: {
                id: userAccountId
            },
            include: {
                profiles: {
                    include: {
                        persons: true,
                        paymentMethods: true,
                        addresses: {
                            include: {
                                meters: true
                            }
                        }
                    }
                }
            }
        });
    });
};

export default root;
