import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPollRepository } from "../src/infra/repositories/inMemory/InMemoryPollRepository";
import { GetAllPollsUseCase } from "../src/application/useCases/polls/GetAllPollsUseCase";
import { IPollRepository } from "../src/domain/repositories/IPollRepository";

let pollRepository: IPollRepository;
let sut: GetAllPollsUseCase;

describe("GET ALL POLL", () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository();
    sut = new GetAllPollsUseCase(pollRepository);
  });

  it("should get all polls", async () => {
    for (let i = 0; i < 3; i++) {
      await pollRepository.create({
        question: `Questão teste ${i}`,
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
    }

    const polls = await sut.execute();

    expect(polls).toHaveLength(3);
    expect(polls[0].question).toEqual("Questão teste 0");
  });
});
