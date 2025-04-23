import express from "express";
import { createPollController } from "./createPollController";
import { getAllPollsController } from "./getAllPollsController";
import { getPollsByStatusController } from "./getPollsByStatusController";
import { editPollController } from "./editPollController";
import { deletePollController } from "./deletePollController";
import { increaseVotesController } from "./increaseVotesController";
import { decreaseVotesController } from "./decreaseVotesController";
import { addOptionToPollController } from "./addOptionToPollController";

const route = express.Router();

route.post("/polls", createPollController);
route.get("/all-polls", getAllPollsController);
route.get("/polls", getPollsByStatusController);
route.put("/poll/:id", editPollController);
route.delete("/poll/:id", deletePollController);
route.put("/poll/:id/option", addOptionToPollController);
route.put("/poll/:pollId/option/:optionId/increase", increaseVotesController);
route.put("/poll/:pollId/option/:optionId/decrease", decreaseVotesController);

export { route };
