import { Options } from "./Options";
import { Status } from "../enums/Status";
import { randomUUID } from "node:crypto";

export class Poll {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly status: Status,
    readonly startDate: Date,
    readonly endDate: Date,
    readonly options: Options[]
  ) {}

  static create(question: string, status: Status, options: Options[]) {
    const id = randomUUID();
    return new Poll(id, question, status, new Date(), new Date(), options);
  }
}
