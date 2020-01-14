import moment from "moment";

export const today = moment();
export const mom = moment();
export const formatISO = date => date.toISOString();
export const monthDayFormat = option => option.format("MMMM Do");
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
  // console.log(today.toString(), startOfWeek.toString(), endOfWeek.toString());
  // console.log(today.isBetween(startOfWeek, endOfWeek));
  return `Week of ${monthDayFormat(startOfWeek)} ending ${monthDayFormat(
    endOfWeek
  )}`;
};
