import express from "express";
import { env } from "./env";
import { route } from "./http/route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(route);

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.PORT}`);
});
