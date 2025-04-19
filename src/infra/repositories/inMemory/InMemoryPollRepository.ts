import { randomUUID } from "node:crypto";
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
    // const newPoll = {
    //   id: randomUUID(),
    //   question: request.question,
    //   status: (request.status as Status) ?? Status.NOT_STARTED,
    //   startDate: request.startDate ?? new Date(),
    //   endDate: request.endDate ?? new Date(),
    //   options: request.options.map((option) => {
    //     return {
    //       id: randomUUID(),
    //       text: option.text,
    //       votes: option.votes,
    //     };
    //   }),
    // };

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

  async edit(request: Partial<Poll>): Promise<Poll> {
    const pollIndex = this.items.findIndex((poll) => poll.id === request.id);

    if (pollIndex === -1) throw new Error("Poll not found");

    return (this.items[pollIndex] = {
      ...this.items[pollIndex],
      ...request,
    });
  }
}
