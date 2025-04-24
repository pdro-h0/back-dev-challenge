import { Status } from "../../../domain/enums/Status";
import { IPollRepository } from "../../../domain/repositories/IPollRepository";
import { AppError } from "../../../http/middlewares/errorHandler";

export class DecreaseVotesUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(pollId: string, optionId: string) {
    const poll = await this.pollRepository.getById(pollId);

    if (!poll) throw new AppError(404, "Poll not found");

    if (poll.status === Status.FINISHED)
      throw new AppError(400, "Poll is finished");

    const option = poll.options.find((option) => option.id === optionId);

    if (!option) throw new AppError(404, "Option not found");

    await this.pollRepository.edit(
      {
        ...poll,
        options: poll.options.map((option) =>
          option.id === optionId
            ? {
                ...option,
                votes: option.votes - 1,
              }
            : option
        ),
      },
      optionId
    );
  }
}
