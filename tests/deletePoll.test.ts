import { beforeEach, describe, expect, it } from "vitest";
import { IPollRepository } from "../src/domain/repositories/IPollRepository";
import { InMemoryPollRepository } from "../src/infra/repositories/inMemory/InMemoryPollRepository";
import { DeletePollUseCase } from "../src/application/useCases/polls/DeletePollUseCase";

let pollRepository: InMemoryPollRepository;
let sut: DeletePollUseCase;

describe("DELETE POLL", () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository();
    sut = new DeletePollUseCase(pollRepository);
  });

  it("Should be able to delete a poll", async () => {
    const pollCreated = await pollRepository.create({
      question: "Nova questão",
      status: "não iniciado",
      startDate: new Date(),
      endDate: new Date(),
      options: [],
    });

    await pollRepository.create({
      question: "Nova questão 2",
      status: "não iniciado",
      startDate: new Date(),
      endDate: new Date(),
      options: [],
    });

    await sut.execute(pollCreated.id);

    expect(pollRepository.items).toHaveLength(1);
  });
});
