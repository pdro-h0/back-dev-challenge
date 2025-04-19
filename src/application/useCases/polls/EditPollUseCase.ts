import { IResponseEditPoll } from "../../../communication/responses/IResponseEditPoll";
import { Poll } from "../../../domain/entities/Poll";
import { IPollRepository } from "../../../domain/repositories/IPollRepository";

export class EditPollUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(request: Partial<Poll>): Promise<IResponseEditPoll> {
    const poll = await this.pollRepository.edit(request);

    return {
      poll,
    };
  }
}
