import { IPollRepository } from "../../../domain/repositories/IPollRepository";

export class DeletePollUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(id: string) {
    const poll = await this.pollRepository.getById(id);

    if (!poll) throw new Error("Poll not found");

    await this.pollRepository.delete(id);
  }
}
