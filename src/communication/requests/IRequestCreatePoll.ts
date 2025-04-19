export interface IRequestCreatePoll {
  question: string;
  status: string;
  startDate: Date;
  endDate: Date;
  options: {
    text: string;
    votes: number;
  }[];
}
