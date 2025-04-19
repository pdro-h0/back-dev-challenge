import { randomUUID } from "node:crypto";

export class Options {
  constructor(
    readonly id: string,
    readonly text: string,
    readonly votes: number
  ) {}

  static create(text: string, votes: number) {
    const id = randomUUID();
    return new Options(id, text, votes);
  }
}
