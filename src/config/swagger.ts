import swaggerJsdoc from "swagger-jsdoc";
// import { SwaggerOptions } from "swagger-ui-express";

// export const swaggerConfig: SwaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "API de Enquetes",
//       version: "1.0.0",
//       description: "API para gerenciamento de enquetes",
//     },
//     servers: [
//       {
//         url: "http://localhost:3333",
//         description: "Servidor de desenvolvimento",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//   },
//   apis: ["./src/http/swagger.ts"],
// };

// import { SwaggerOptions } from "swagger-ui-express";

// const swaggerDocument = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "API de Enquetes",
//       version: "1.0.0",
//       description: "API para gerenciamento de enquetes",
//     },
//     servers: [
//       {
//         url: "http://localhost:3333",
//         description: "Servidor de desenvolvimento",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//   },
// };

const swaggerDefinition = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  openapi: "3.0.0",
  info: {
    title: "API de Enquetes",
    version: "1.0.0",
  },
  description: "API para gerenciamento de enquetes",
};

const options = {
  swaggerDefinition,
  apis: ["./src/http/swagger.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
