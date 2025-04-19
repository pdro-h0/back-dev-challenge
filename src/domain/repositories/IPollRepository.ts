import { Poll } from "../entities/Poll";

export interface IPollRepository {
  create(request: {
    question: string;
    status: string;
    startDate: Date;
    endDate: Date;
    options: {
      text: string;
      votes: number;
    }[];
  }): Promise<Poll>;

  getAll(): Promise<Poll[]>;

  getByStatus(status: string): Promise<Poll[]>;

  edit(request: Partial<Poll>): Promise<Poll>;
}
