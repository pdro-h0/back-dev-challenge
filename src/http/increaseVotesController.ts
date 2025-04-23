import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { IncreaseVotesUseCase } from "../application/useCases/polls/IncreaseVotesUseCase";

export const increaseVotesController: RequestHandler = async (req, res) => {
  const increaseVotesParamsSchema = z.object({
    pollId: z.string().uuid(),
    optionId: z.string().uuid(),
  });

  const paramsSchema = increaseVotesParamsSchema.safeParse(req.params);

  if (!paramsSchema.success) {
    res.status(400).json({ error: paramsSchema.error });
    return;
  }

  try {
    const { pollId, optionId } = paramsSchema.data;

    const useCase = new IncreaseVotesUseCase(new PrismaPollRepository());

    await useCase.execute(pollId, optionId);

    res.status(204).end();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
