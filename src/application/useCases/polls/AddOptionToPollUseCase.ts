import { IPollRepository } from "../../../domain/repositories/IPollRepository";

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

    if (!poll) throw new Error("Poll not found");

    await this.pollRepository.addOption(request, id);
  }
}
