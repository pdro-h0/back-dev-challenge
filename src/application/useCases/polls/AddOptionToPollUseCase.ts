import { IPollRepository } from "../../../domain/repositories/IPollRepository";
import { AppError } from "../../../http/middlewares/errorHandler";

export class AddOptionToPollUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(
    request: {
      text: string;
      votes: number;
    },
    id: string
  ) {
    const poll = await this.pollRepository.getById(id);

    if (!poll) throw new AppError(404, "Poll not found");

    await this.pollRepository.addOption(request, id);
  }
}
