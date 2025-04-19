import { IPollRepository } from "../../../domain/repositories/IPollRepository";
import { IRequestCreatePoll } from "../../../communication/requests/IRequestCreatePoll";
import { IResponseCreatePoll } from "../../../communication/responses/IResponseCreatePoll";

export class CreatePollUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(request: IRequestCreatePoll): Promise<IResponseCreatePoll> {
    const poll = await this.pollRepository.create(request);

    if (poll.options.length < 3)
      throw new Error("A quantidade de opções deve ser maior que 2");

    return { poll };
  }
}
