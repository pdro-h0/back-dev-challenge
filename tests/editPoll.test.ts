import { beforeEach, it, describe, expect } from "vitest";
import { IPollRepository } from "../src/domain/repositories/IPollRepository";
import { InMemoryPollRepository } from "../src/infra/repositories/inMemory/InMemoryPollRepository";
import { EditPollUseCase } from "../src/application/useCases/polls/EditPollUseCase";
import { Status } from "../src/domain/enums/Status";

let pollRepository: IPollRepository;
let sut: EditPollUseCase;

describe("EDIT POLL", () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository();
    sut = new EditPollUseCase(pollRepository);
  });

  it("Should be able to edit a poll", async () => {
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

    const { poll } = await sut.execute({
      id: pollCreated.id,
      question: "Nova questão editada",
      status: Status.IN_PROGRESS,
    });

    expect(poll.question).toBe("Nova questão editada");
    expect(poll.status).toBe("em andamento");
  });
});
