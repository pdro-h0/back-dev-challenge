import { RequestHandler } from "express";
import { DeletePollUseCase } from "../application/useCases/polls/DeletePollUseCase";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { z } from "zod";

export const deletePollController: RequestHandler = async (req, res) => {
  const deletePollParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const paramsSchema = deletePollParamsSchema.safeParse(req.params);

  if (!paramsSchema.success) {
    res.status(400).json({ error: paramsSchema.error.message });
    return;
  }

  try {
    const { id } = paramsSchema.data;
    const useCase = new DeletePollUseCase(new PrismaPollRepository());
    await useCase.execute(id);

    res.status(204).end();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
