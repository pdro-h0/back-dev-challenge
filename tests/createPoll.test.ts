import { describe, it, expect, beforeEach } from "vitest";
import { IPollRepository } from "../src/domain/repositories/IPollRepository";
import { CreatePollUseCase } from "../src/application/useCases/polls/CreatePollUseCase";
import { InMemoryPollRepository } from "../src/infra/repositories/inMemory/InMemoryPollRepository";

let pollRepository: IPollRepository;
let sut: CreatePollUseCase;

describe("CREATE POLL", () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository();
    sut = new CreatePollUseCase(pollRepository);
  });

  it("should create a poll", async () => {
    const input = {
      question: "Questão teste",
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
    };

    const { poll } = await sut.execute(input);

    console.log(poll);

    expect(poll.id).toEqual(expect.any(String));
    expect(poll.question).toEqual(input.question);
    expect(poll.options).toHaveLength(3);
    expect(poll.options[0].text).toEqual(input.options[0].text);
  });

  it("Should not create a poll with less than 3 options", async () => {
    const input = {
      question: "Questão teste",
      status: "não iniciado",
      startDate: new Date(),
      endDate: new Date(),
      options: [
        {
          text: "Opção 1",
          votes: 15,
        },
      ],
    };

    await expect(sut.execute(input)).rejects.toThrow(
      "A quantidade de opções deve ser maior que 2"
    );
  });
});
