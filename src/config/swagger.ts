import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "File Upload API",
      version: "1.0.0",
      description: "API for uploading images and files to local storage and Cloudinary",
    },
    servers: [
      { url: "http://localhost:5000", description: "Local server" }
    ]
  },
  apis: ["./src/routes/*.ts"], // Path to your route files with Swagger comments
};

const specs = swaggerJsdoc(options);
export default specs;
