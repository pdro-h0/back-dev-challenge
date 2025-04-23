import express from "express";
import { env } from "./env";
import { route } from "./http/route";

const app = express();

app.use(express.json());
app.use(route);

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.PORT}`);
});
