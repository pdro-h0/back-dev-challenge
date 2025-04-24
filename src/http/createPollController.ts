import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { CreatePollUseCase } from "../application/useCases/polls/CreatePollUseCase";

export const createPollController: RequestHandler = async (req, res) => {
  const createPollBodySchema = z.object({
    question: z.string(),
    status: z.enum(["NOT_STARTED", "STARTED", "IN_PROGRESS", "FINISHED"]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    options: z.array(
      z.object({
        text: z.string(),
        votes: z.number(),
      })
    ),
  });

  const bodySchema = createPollBodySchema.parse(req.body);

  const { question, status, startDate, endDate, options } = bodySchema;

  const useCase = new CreatePollUseCase(new PrismaPollRepository());

  const { poll } = await useCase.execute({
    question,
    status,
    startDate,
    endDate,
    options,
  });

  res.status(201).json(poll);
  return;
};
