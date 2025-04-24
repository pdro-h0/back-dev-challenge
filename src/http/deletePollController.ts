import { RequestHandler } from "express";
import { DeletePollUseCase } from "../application/useCases/polls/DeletePollUseCase";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { z } from "zod";

export const deletePollController: RequestHandler = async (req, res) => {
  const deletePollParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const paramsSchema = deletePollParamsSchema.parse(req.params);

  const { id } = paramsSchema;
  const useCase = new DeletePollUseCase(new PrismaPollRepository());
  await useCase.execute(id);

  res.status(204).end();
  return;
};
