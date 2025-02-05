import moment from "moment";

export const formateDate = ({ date, format = "DD MMM YYYY" }: { date: Date; format?: string }) => {
  return moment(date).format(format);
};
