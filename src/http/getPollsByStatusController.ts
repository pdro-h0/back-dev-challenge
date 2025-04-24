import { RequestHandler } from "express";
import { GetPollsByStatusUseCase } from "../application/useCases/polls/GetPollsByStatus";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { z } from "zod";

export const getPollsByStatusController: RequestHandler = async (req, res) => {
  const getPollsByStatusSchema = z.object({
    status: z.enum(["NOT_STARTED", "STARTED", "IN_PROGRESS", "FINISHED"]),
  });

  const querySchema = getPollsByStatusSchema.parse(req.query);

  const { status } = querySchema;
  const useCase = new GetPollsByStatusUseCase(new PrismaPollRepository());
  const polls = await useCase.execute(status);

  res.status(200).json(polls);
  return;
};
