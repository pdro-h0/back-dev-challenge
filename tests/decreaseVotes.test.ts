import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPollRepository } from "../src/infra/repositories/inMemory/InMemoryPollRepository";
import { DecreaseVotesUseCase } from "../src/application/useCases/polls/DecreaseVotesUseCase";

let pollRepository: InMemoryPollRepository;
let sut: DecreaseVotesUseCase;

describe("INCREASE VOTES", () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository();
    sut = new DecreaseVotesUseCase(pollRepository);
  });

  it("Should be able to decrease votes in a poll", async () => {
    const pollCreated = await pollRepository.create({
      question: "Nova questão",
      status: "não iniciado",
      startDate: new Date(),
      endDate: new Date(),
      options: [
        {
          text: "Opção 1",
          votes: 1,
        },
        {
          text: "Opção 2",
          votes: 5,
        },
        {
          text: "Opção 3",
          votes: 9,
        },
      ],
    });

    await sut.execute(pollCreated.id, pollCreated.options[0].id);

    expect(pollRepository.items[0].options[0].votes).toBe(0);
    expect(pollRepository.items[0].options[1].votes).toBe(5);
    expect(pollRepository.items[0].options[2].votes).toBe(9);
  });

  it("Should not be able to increase votes in a past poll", async () => {
    const pollCreated = await pollRepository.create({
      question: "Nova questão",
      status: "finalizado",
      startDate: new Date(2025, 4, 19),
      endDate: new Date(2025, 4, 20),
      options: [
        {
          text: "Opção 1",
          votes: 5,
        },
        {
          text: "Opção 2",
          votes: 5,
        },
        {
          text: "Opção 3",
          votes: 5,
        },
      ],
    });

    await expect(
      sut.execute(pollCreated.id, pollCreated.options[0].id)
    ).rejects.toThrow();
  });

  it("Should not be able to increase votes in a finished poll", async () => {
    const pollCreated = await pollRepository.create({
      question: "Nova questão",
      status: "finalizado",
      startDate: new Date(),
      endDate: new Date(),
      options: [
        {
          text: "Opção 1",
          votes: 5,
        },
        {
          text: "Opção 2",
          votes: 5,
        },
        {
          text: "Opção 3",
          votes: 5,
        },
      ],
    });

    await expect(
      sut.execute(pollCreated.id, pollCreated.options[0].id)
    ).rejects.toThrow();
  });
});
