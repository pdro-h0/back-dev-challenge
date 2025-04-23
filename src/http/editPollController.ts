import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";
import { EditPollUseCase } from "../application/useCases/polls/EditPollUseCase";

export const editPollController: RequestHandler = async (req, res) => {
  const editPollBodySchema = z.object({
    question: z.string().optional(),
    status: z
      .enum(["NOT_STARTED", "STARTED", "IN_PROGRESS", "FINISHED"])
      .optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    options: z
      .array(
        z.object({
          text: z.string().optional(),
          votes: z.number().optional(),
        })
      )
      .optional(),
  });

  const editPollParamsSchema = z.object({
    id: z.string().uuid(),
    optionId: z.string().uuid().optional(),
  });

  const bodySchema = editPollBodySchema.safeParse(req.body);
  const paramsSchema = editPollParamsSchema.safeParse(req.params);

  if (!paramsSchema.success) {
    res.status(400).json({ error: paramsSchema.error });
    return;
  }

  if (!bodySchema.success) {
    res.status(400).json({ error: bodySchema.error });
    return;
  }

  try {
    const { question, status, startDate, endDate, options } = bodySchema.data;
    const { id, optionId } = paramsSchema.data;

    const useCase = new EditPollUseCase(new PrismaPollRepository());

    const { poll } = await useCase.execute(
      {
        question,
        status,
        startDate,
        endDate,
        options,
      },
      id,
      optionId
    );

    res.status(200).json(poll);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
