import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { IncreaseVotesUseCase } from "../application/useCases/polls/IncreaseVotesUseCase";

export const increaseVotesController: RequestHandler = async (req, res) => {
  const increaseVotesParamsSchema = z.object({
    pollId: z.string().uuid(),
    optionId: z.string().uuid(),
  });

  const paramsSchema = increaseVotesParamsSchema.parse(req.params);

  const { pollId, optionId } = paramsSchema;

  const useCase = new IncreaseVotesUseCase(new PrismaPollRepository());

  await useCase.execute(pollId, optionId);

  res.status(204).end();
  return;
};
