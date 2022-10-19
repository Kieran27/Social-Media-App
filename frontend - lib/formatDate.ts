import { format, parseISO } from "date-fns";

const formatDate = (dateString: string) => {
  const formattedDate = format(parseISO(dateString), "dd-MM-yy");
  return formattedDate;
};

export default formatDate;
