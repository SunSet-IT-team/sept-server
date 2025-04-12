// core/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Septik API',
            version: '1.0.12',
            description: 'Документация API',
        },
        servers: [
            {
                url: '/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{bearerAuth: []}],
    },
    apis: ['./src_new/modules/**/*.docs.ts'],
});
