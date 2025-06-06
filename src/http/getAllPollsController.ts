import { RequestHandler } from "express";
import { GetAllPollsUseCase } from "../application/useCases/polls/GetAllPollsUseCase";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";

export const getAllPollsController: RequestHandler = async (req, res) => {
  const useCase = new GetAllPollsUseCase(new PrismaPollRepository());
  const polls = await useCase.execute();

  res.status(200).json(polls);
  return;
};
