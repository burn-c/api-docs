
import type { FastifyPluginAsync } from 'fastify';
import z from 'zod';

export const createUserRoute: FastifyPluginAsync = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        summary: 'Create an user',
        security: [
          {
            bearerAuth: [],
          }
        ],

        body: z.object({
          name: z.string().max(100).nullable(),
          email: z.string().email(),
        }),

        response: {
          '201': z.object({
            userId: z.string().uuid().describe('New user ID'),
          }).describe('User created'),

          '400': z.object({
            error: z.array(
              z.object({
                name: z.string(),
                error: z.string(),
              }),
            ),
          }),

          '409': z.object({
            message: z.string(),
          }).describe('User e-mail already exists.'),
        },

        // body: {
        //   type: 'object',
        //   examples: [
        //     {
        //       name: 'John Doe',
        //       email: 'john.doe@example.com'
        //     }
        //   ],
        //   properties: {
        //     name: {
        //       type: ['string', 'null'],
        //       maxLength: 100,
        //     },
        //     email: {
        //       type: 'string',
        //       format: 'email',
        //     },
        //   },
        // },

        // response: {
        //   '201': {
        //     description: 'User created',
        //     type: 'object',
        //     properties: {
        //       userId: {
        //         type: 'string',
        //         format: 'uuid',
        //         description: 'New user ID'
        //       },
        //     },
        //   },

        //   '400': {
        //     description: 'Validation failed',
        //     type: 'object',
        //     properties: {
        //       error: {
        //         type: 'array',
        //         items: {
        //           type: 'object',
        //           required: ['name', 'error'],
        //           properties: {
        //             name: {
        //               type: 'string',
        //             },
        //             error: {
        //               type: 'string',
        //             },
        //           },
        //         },
        //       },
        //     },
        //   },

        //   '409': {
        //     description: 'User e-mail already exists.',
        //     type: 'object',
        //     properties: {
        //       message: {
        //         type: 'string',
        //       },
        //     },
        //   },
        // },
      },
    },
    () => {
      return { userId: '123' }
    },
  );
};