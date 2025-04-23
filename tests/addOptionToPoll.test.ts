import { describe, it, expect, beforeEach } from "vitest";
import { IPollRepository } from "../src/domain/repositories/IPollRepository";
import { InMemoryPollRepository } from "../src/infra/repositories/inMemory/InMemoryPollRepository";
import { CreatePollUseCase } from "../src/application/useCases/polls/CreatePollUseCase";
import { AddOptionToPollUseCase } from "../src/application/useCases/polls/AddOptionToPollUseCase";

let pollRepository: IPollRepository;
let sut: AddOptionToPollUseCase;

describe("ADD OPTION TO POLL", () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository();
    sut = new AddOptionToPollUseCase(pollRepository);
  });

  it("should add an option to a poll", async () => {
    const pollCreated = await pollRepository.create({
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

    const input = {
      text: "nova opção",
      votes: 0,
    };

    await sut.execute(input, pollCreated.id);

    expect(pollCreated.options.length).toBe(4);
    expect(pollCreated.options[3].text).toBe("nova opção");
    expect(pollCreated.options[3].votes).toBe(0);
  });
});
