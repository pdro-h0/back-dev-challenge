import { Options } from "../../../domain/entities/Options";
import { Poll } from "../../../domain/entities/Poll";
import { Status } from "../../../domain/enums/Status";
import { IPollRepository } from "../../../domain/repositories/IPollRepository";

export class InMemoryPollRepository implements IPollRepository {
  public items: Poll[] = [];

  async create(request: {
    question: string;
    status: string;
    startDate: Date;
    endDate: Date;
    options: { text: string; votes: number }[];
  }): Promise<Poll> {
    const newPoll = Poll.create(
      request.question,
      request.status as Status,
      request.options.map((option) => Options.create(option.text, option.votes))
    );

    this.items.push(newPoll);
    return newPoll;
  }

  async getAll(): Promise<Poll[]> {
    return await this.items;
  }

  async getByStatus(status: string): Promise<Poll[]> {
    return await this.items.filter((item) => item.status === status);
  }

  async getById(id: string): Promise<Poll | null> {
    return (await this.items.find((item) => item.id === id)) ?? null;
  }

  async edit(request: Partial<Poll>): Promise<Poll> {
    const pollIndex = this.items.findIndex((poll) => poll.id === request.id);

    if (pollIndex === -1) throw new Error("Poll not found");

    return (this.items[pollIndex] = {
      ...this.items[pollIndex],
      ...request,
    });
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((poll) => poll.id !== id);
  }

  async addOption(
    request: { text: string; votes: number },
    id: string
  ): Promise<void> {
    this.items
      .find((poll) => poll.id === id)
      ?.options.push(Options.create(request.text, request.votes));
  }
}
