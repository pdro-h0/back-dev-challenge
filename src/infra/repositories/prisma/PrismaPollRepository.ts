import { db } from "../../../../lib/prisma";
import { Options } from "../../../domain/entities/Options";
import { Poll } from "../../../domain/entities/Poll";
import { Status } from "../../../domain/enums/Status";
import { IPollRepository } from "../../../domain/repositories/IPollRepository";
export class PrismaPollRepository implements IPollRepository {
  async create(request: {
    question: string;
    status: string;
    startDate: Date;
    endDate: Date;
    options: { text: string; votes: number }[];
  }): Promise<Poll> {
    const createdPoll = await db.poll.create({
      include: {
        options: true,
      },
      data: {
        question: request.question,
        status: request.status as Status,
        startDate: request.startDate,
        endDate: request.endDate,
        options: {
          createMany: {
            data: request.options.map((option) => ({
              text: option.text,
              votes: option.votes,
            })),
          },
        },
      },
    });

    const pollWithOptions = await db.poll.findUniqueOrThrow({
      where: { id: createdPoll.id },
      include: { options: true },
    });

    const options = pollWithOptions.options.map(
      (option) => new Options(option.id, option.text, option.votes)
    );

    return new Poll(
      pollWithOptions.id,
      pollWithOptions.question,
      pollWithOptions.status,
      pollWithOptions.startDate,
      pollWithOptions.endDate,
      options
    );
  }

  async getAll(): Promise<Poll[]> {
    const polls = await db.poll.findMany({
      include: {
        options: true,
      },
    });

    return polls.map((poll) => {
      return {
        ...poll,
        status: poll.status as Status,
      };
    });
  }

  async getByStatus(status: string): Promise<Poll[]> {
    return await db.poll.findMany({
      where: {
        status: status as Status,
      },
      include: {
        options: true,
      },
    });
  }

  async getById(id: string): Promise<Poll | null> {
    return await db.poll.findUnique({
      where: {
        id,
      },
      include: {
        options: true,
      },
    });
  }

  async edit(request: Partial<Poll>, optionId: string): Promise<Poll> {
    return await db.poll.update({
      where: {
        id: request.id,
      },
      data: {
        ...request,
        options: {
          updateMany: {
            where: {
              id: optionId,
            },
            data: {
              text: request.options?.find((option) => option.id === optionId)
                ?.text,
              votes: request.options?.find((option) => option.id === optionId)
                ?.votes,
            },
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await db.poll.delete({
      where: {
        id,
      },
    });
  }

  async addOption(
    request: { text: string; votes: number },
    id: string
  ): Promise<void> {
    await db.poll.update({
      where: {
        id,
      },
      data: {
        options: {
          create: {
            text: request.text,
            votes: request.votes,
          },
        },
      },
    });
  }
}
