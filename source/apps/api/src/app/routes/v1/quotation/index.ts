import { FastifyInstance } from 'fastify';
import prismaClient from '../../../clients/prisma.client';
import { IQuotation } from '@ems/shared';

export default async (instance: FastifyInstance) => {
  instance.get('/', async (request, reply) => {
    return reply.status(200).send({ hello: 'world' });
  });

  instance.post('/', async (request, reply) => {
    const quotation = request.body as IQuotation;
    const prisma = prismaClient();
    const quotationCreationResponse = await prisma.quotation.create({
      data: {
        ...quotation,
        quotationLineItems: {
          createMany: {
            data: [
              ...quotation.quotationLineItems.map((lineItem) => ({
                title: lineItem.title,
                description: lineItem.description,
                unit: lineItem.unit,
                purchasePricePerUnit: lineItem.purchasePricePerUnit,
                quantity: lineItem.quantity,
                salePricePerUnit: lineItem.salePricePerUnit,
                saleTaxRate: lineItem.saleTaxRate,
              })),
            ],
          },
        },
      },
    });

    reply.status(200).send(quotationCreationResponse);
  });
};
