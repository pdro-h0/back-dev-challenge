import { RequestHandler } from "express";
import { GetAllPollsUseCase } from "../application/useCases/polls/GetAllPollsUseCase";
import { PrismaPollRepository } from "../infra/repositories/prisma/PrismaPollRepository";

export const getAllPollsController: RequestHandler = async (req, res) => {
  try {
    const useCase = new GetAllPollsUseCase(new PrismaPollRepository());
    const polls = await useCase.execute();

    res.status(200).json(polls);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
