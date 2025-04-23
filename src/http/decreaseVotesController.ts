import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { DecreaseVotesUseCase } from "../application/useCases/polls/DecreaseVotesUseCase";

export const decreaseVotesController: RequestHandler = async (req, res) => {
  const decreaseVotesParamsSchema = z.object({
    pollId: z.string().uuid(),
    optionId: z.string().uuid(),
  });

  const paramsSchema = decreaseVotesParamsSchema.safeParse(req.params);

  if (!paramsSchema.success) {
    res.status(400).json({ error: paramsSchema.error });
    return;
  }

  try {
    const { pollId, optionId } = paramsSchema.data;

    const useCase = new DecreaseVotesUseCase(new PrismaPollRepository());

    await useCase.execute(pollId, optionId);

    res.status(204).end();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
