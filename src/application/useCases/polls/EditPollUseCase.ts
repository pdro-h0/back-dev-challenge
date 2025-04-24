import { IResponseEditPoll } from "../../../communication/responses/IResponseEditPoll";
import { Poll } from "../../../domain/entities/Poll";
import { IPollRepository } from "../../../domain/repositories/IPollRepository";
import { AppError } from "../../../http/middlewares/errorHandler";

export class EditPollUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(
    request: Partial<Poll>,
    id: string,
    optionId?: string
  ): Promise<IResponseEditPoll> {
    const poll = await this.pollRepository.getById(id);

    if (!poll) throw new AppError(404, "poll not found");

    const pollEdited = await this.pollRepository.edit(
      {
        ...request,
        id: poll.id,
      },
      optionId
    );

    return {
      poll: pollEdited,
    };
  }
}
