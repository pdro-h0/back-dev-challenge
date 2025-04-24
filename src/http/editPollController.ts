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

  const bodySchema = editPollBodySchema.parse(req.body);
  const paramsSchema = editPollParamsSchema.parse(req.params);

  const { question, status, startDate, endDate, options } = bodySchema;
  const { id, optionId } = paramsSchema;

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
};
