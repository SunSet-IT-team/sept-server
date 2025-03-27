import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Septic Server API",
            version: "1.0.0",
            description: "Документация API септики",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
