import { IResponseGetByStatus } from "../../../communication/responses/IResponseGetByStatus";
import { IPollRepository } from "../../../domain/repositories/IPollRepository";
export class GetPollsByStatusUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(status: string): Promise<IResponseGetByStatus[]> {
    const polls = await this.pollRepository.getByStatus(status);

    return polls.map((poll) => ({
      id: poll.id,
      question: poll.question,
      status: poll.status,
      startDate: poll.startDate,
      endDate: poll.endDate,
      options: poll.options,
    }));
  }
}
