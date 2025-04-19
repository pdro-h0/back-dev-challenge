import { IResponseGetAllPolls } from "../../../communication/responses/IResponseGetAllPolls";
import { IPollRepository } from "../../../domain/repositories/IPollRepository";
export class GetAllPollsUseCase {
  constructor(private readonly pollRepository: IPollRepository) {}

  async execute(): Promise<IResponseGetAllPolls[]> {
    return await this.pollRepository.getAll();
  }
}
