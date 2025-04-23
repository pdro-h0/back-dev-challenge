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

  getById(id: string): Promise<Poll | null>;

  edit(request: Partial<Poll>, optionId?: string): Promise<Poll>;

  delete(id: string): Promise<void>;

  addOption(
    request: {
      text: string;
      votes: number;
    },
    id: string
  ): Promise<void>;
}
