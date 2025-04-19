import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPollRepository } from "../src/infra/repositories/inMemory/InMemoryPollRepository";
import { GetPollsByStatusUseCase } from "../src/application/useCases/polls/GetPollsByStatus";
import { IPollRepository } from "../src/domain/repositories/IPollRepository";

let pollRepository: IPollRepository;
let sut: GetPollsByStatusUseCase;

describe("GET POLLS BY STATUS", () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository();
    sut = new GetPollsByStatusUseCase(pollRepository);
  });

  it("should get all polls", async () => {
    for (let i = 0; i < 2; i++) {
      await pollRepository.create({
        question: `Questão teste ${i}`,
        status: "iniciado",
        startDate: new Date(),
        endDate: new Date(),
        options: [
          {
            text: "Opção 1",
            votes: 15,
          },
          {
            text: "Opção 2",
            votes: 7,
          },
          {
            text: "Opção 3",
            votes: 3,
          },
        ],
      });
    }

    await pollRepository.create({
      question: "Nova questão",
      status: "não iniciado",
      startDate: new Date(),
      endDate: new Date(),
      options: [
        {
          text: "Opção 1",
          votes: 15,
        },
        {
          text: "Opção 2",
          votes: 7,
        },
        {
          text: "Opção 3",
          votes: 3,
        },
      ],
    });

    const polls = await sut.execute("não iniciado");

    expect(polls).toHaveLength(1);
    expect(polls[0].question).toEqual("Nova questão");
  });
});
