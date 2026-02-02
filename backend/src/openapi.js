export const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "DevOps-Sharing Backend API",
    version: "1.0.0",
    description: "Sample API for CI/CD + local deploy review"
  },
  servers: [{ url: "/" }],
  tags: [
    { name: "health", description: "Health checks" },
    { name: "hello", description: "Greeting endpoints" },
    { name: "tools", description: "Utilities for review" }
  ],
  paths: {
    "/health": {
      get: {
        tags: ["health"],
        summary: "Health check",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { status: { type: "string", example: "ok" } },
                  required: ["status"]
                }
              }
            }
          }
        }
      }
    },
    "/api/hello": {
      get: {
        tags: ["hello"],
        summary: "Hello (query)",
        parameters: [
          {
            name: "name",
            in: "query",
            required: false,
            schema: { type: "string", example: "DevOps" }
          }
        ],
        responses: {
          200: {
            description: "Greeting",
            content: { "application/json": { schema: { $ref: "#/components/schemas/HelloResponse" } } }
          }
        }
      },
      post: {
        tags: ["hello"],
        summary: "Hello (JSON body)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { name: { type: "string", example: "DevOps" } }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Greeting",
            content: { "application/json": { schema: { $ref: "#/components/schemas/HelloResponse" } } }
          }
        }
      }
    },
    "/api/add": {
      get: {
        tags: ["tools"],
        summary: "Add two numbers",
        parameters: [
          { name: "a", in: "query", required: true, schema: { type: "number", example: 1 } },
          { name: "b", in: "query", required: true, schema: { type: "number", example: 2 } }
        ],
        responses: {
          200: {
            description: "Sum",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    a: { type: "number" },
                    b: { type: "number" },
                    sum: { type: "number" }
                  },
                  required: ["a", "b", "sum"]
                }
              }
            }
          },
          400: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { error: { type: "string" } },
                  required: ["error"]
                }
              }
            }
          }
        }
      }
    },
    "/api/info": {
      get: {
        tags: ["tools"],
        summary: "Runtime info",
        responses: {
          200: {
            description: "Info",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    service: { type: "string" },
                    node: { type: "string" },
                    hostname: { type: "string" },
                    platform: { type: "string" },
                    uptimeSeconds: { type: "integer" },
                    timestamp: { type: "string" }
                  },
                  required: ["service", "node", "hostname", "platform", "uptimeSeconds", "timestamp"]
                }
              }
            }
          }
        }
      }
    },
    "/api/openapi.json": {
      get: {
        tags: ["tools"],
        summary: "OpenAPI spec (JSON)",
        responses: { 200: { description: "OpenAPI JSON" } }
      }
    }
  },
  components: {
    schemas: {
      HelloResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Hello, DevOps!" },
          service: { type: "string", example: "backend" },
          timestamp: { type: "string", example: "2026-02-02T10:46:21.656Z" }
        },
        required: ["message", "service", "timestamp"]
      }
    }
  }
};

