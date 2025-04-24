import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { AddOptionToPollUseCase } from "../application/useCases/polls/AddOptionToPollUseCase";

export const addOptionToPollController: RequestHandler = async (req, res) => {
  const addOptionToPollBodySchema = z.object({
    text: z.string(),
    votes: z.number(),
  });

  const addOptionToPollParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const bodySchema = addOptionToPollBodySchema.parse(req.body);
  const paramsSchema = addOptionToPollParamsSchema.parse(req.params);

  try {
    const { text, votes } = bodySchema;
    const { id } = paramsSchema;

    const useCase = new AddOptionToPollUseCase(new PrismaPollRepository());

    await useCase.execute(
      {
        text,
        votes,
      },
      id
    );

    res.status(204).end();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
