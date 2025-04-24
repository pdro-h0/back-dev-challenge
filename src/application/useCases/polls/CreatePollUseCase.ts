import { IPollRepository } from "../../../domain/repositories/IPollRepository";
import { IRequestCreatePoll } from "../../../communication/requests/IRequestCreatePoll";
import { IResponseCreatePoll } from "../../../communication/responses/IResponseCreatePoll";
import { AppError } from "../../../http/middlewares/errorHandler";

export class CreatePollUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(request: IRequestCreatePoll): Promise<IResponseCreatePoll> {
    if (request.options.length < 3)
      throw new AppError(400, "A quantidade de opções deve ser maior que 2");

    const poll = await this.pollRepository.create(request);

    return { poll };
  }
}
