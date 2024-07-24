const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'User API',
        version: '1.0.0',
        description: 'User Apis',
      },
    },
    apis: ['./routes/*.js'],
  };
  
  module.exports = swaggerOptions