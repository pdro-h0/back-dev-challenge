import { RequestHandler } from "express";
import { GetPollsByStatusUseCase } from "../application/useCases/polls/GetPollsByStatus";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { z } from "zod";

export const getPollsByStatusController: RequestHandler = async (req, res) => {
  const getPollsByStatusSchema = z.object({
    status: z.enum(["NOT_STARTED", "STARTED", "IN_PROGRESS", "FINISHED"]),
  });

  const querySchema = getPollsByStatusSchema.safeParse(req.query);

  if (!querySchema.success) {
    res.status(400).json({ error: querySchema.error.message });
    return;
  }

  try {
    const { status } = querySchema.data;
    const useCase = new GetPollsByStatusUseCase(new PrismaPollRepository());
    const polls = await useCase.execute(status);

    res.status(200).json(polls);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
