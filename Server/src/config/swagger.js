const { SERVER_HOST, PORT } = process.env;
export const options = {
  swaggerDefinition: {
      info: {
        title: "DEMO API",
        version: "1.0.0",
        description: "DEMO API with autogenerated swagger doc",
      },
      host: `${SERVER_HOST}:${PORT}`,
      basePath: "/",
      produces: ["application/json"],
    },
    apis: ["src/routes/*.js"],
};
export default options;