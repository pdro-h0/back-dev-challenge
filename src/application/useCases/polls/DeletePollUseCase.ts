import { IPollRepository } from "../../../domain/repositories/IPollRepository";
import { AppError } from "../../../http/middlewares/errorHandler";

export class DeletePollUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(id: string) {
    const poll = await this.pollRepository.getById(id);

    if (!poll) throw new AppError(404, "Poll not found");

    await this.pollRepository.delete(id);
  }
}
