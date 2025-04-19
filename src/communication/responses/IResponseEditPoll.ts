export interface IResponseEditPoll {
  poll: {
    id: string;
    question: string;
    status: string;
    startDate: Date;
    endDate: Date;
    options: {
      text: string;
      votes: number;
    }[];
  };
}
