import moment from "moment";

export const today = moment();
export const mom = moment();
export const formatISO = date => date.toISOString();
export const monthDayFormat = option => option.format("MMMM Do");
export const monthDayYearFormat = option => option.format("MMMM Do YYYY");
export const startOfWeek = moment().startOf("isoWeek");
export const endOfWeek = moment().endOf("isoWeek");
export const importISO = iso => moment(iso);
export const getDayName = () => moment().format("dddd");
export const weekFuture = (days = 7) => moment().add(days, "days");
export const futureFirstWeek = moment()
  .startOf("isoWeek")
  .add(7, "days")
  .toISOString();
export const currentWeek = () => {
  return `Week of ${monthDayFormat(startOfWeek)} ending ${monthDayFormat(
    endOfWeek
  )}`;
};
