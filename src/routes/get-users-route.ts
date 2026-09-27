import type { FastifyPluginAsync } from 'fastify';
import z from 'zod';

export const getUsersRoute: FastifyPluginAsync = async (app) => {
  app.get(
    '/users',
    {
      schema: {
        summary: 'Get all users',
        querystring: z.object({
          page: z.number().min(1).default(1),
        }),

        response: {
          '200': z.object({
            data: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string().max(100).nullable(),
                email: z.string().email(),
              }),
            ),
          }).describe('A list of users'),

          '400': z.object({
            error: z.array(
              z.object({
                name: z.string(),
                error: z.string(),
              }),
            ),
          }),

          '500': z.object({
            error: z.string(),
          }),

        },


        // querystring: {
        //   type: 'object',
        //   properties: {
        //     page: {
        //       type: 'integer',
        //       minimum: 1,
        //       default: 1,
        //     },
        //   },
        // },

        // response: {
        //   '200': {
        //     description: 'A list of users',
        //     type: 'object',
        //     properties: {
        //       data: {
        //         type: 'array',
        //         items: {
        //           type: 'object',
        //           required: ['id', 'name', 'email'],
        //           examples: [
        //             {
        //               id: '123e4567-e89b-12d3-a456-426614174000',
        //               name: 'John Doe',
        //               email: 'john.doe@example.com'
        //             }
        //           ],
        //           properties: {
        //             id: {
        //               type: 'string',
        //               format: 'uuid',
        //             },
        //             name: {
        //               type: ['string', 'null'],
        //               maxLength: 100,
        //             },
        //             email: {
        //               type: 'string',
        //               format: 'email',
        //             },
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
      },
    },
    () => {},
  );
};