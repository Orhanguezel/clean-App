import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";

// 📌 YAML dosyasını doğru konumdan yükle
const swaggerPath = path.join(process.cwd(), "config", "swagger.yaml");

const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8"));

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`📚 Swagger belgeleri hazır: ${BASE_URL}/api-docs`);
};

export default setupSwagger;
