const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Ease API',
      version: '1.0.0',
      description: 'Travel Ease Express API Documentation',
    },

    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },

  apis: ['./index.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;