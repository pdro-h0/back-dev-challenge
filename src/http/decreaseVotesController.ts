import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { DecreaseVotesUseCase } from "../application/useCases/polls/DecreaseVotesUseCase";

export const decreaseVotesController: RequestHandler = async (req, res) => {
  const decreaseVotesParamsSchema = z.object({
    pollId: z.string().uuid(),
    optionId: z.string().uuid(),
  });

  const paramsSchema = decreaseVotesParamsSchema.parse(req.params);

  const { pollId, optionId } = paramsSchema;

  const useCase = new DecreaseVotesUseCase(new PrismaPollRepository());

  await useCase.execute(pollId, optionId);

  res.status(204).end();
  return;
};
