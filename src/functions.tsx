import { OpeningHours, WeeklyOpeningHours } from "./types";

export const isOpenNow = (openingHours: WeeklyOpeningHours | null): boolean => {
  if (!openingHours) {
    return false;
  }

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  let todayOpeningHours: OpeningHours | null = null;

  switch (currentDay) {
    case 0:
      todayOpeningHours = openingHours.sunday;
      break;
    case 1:
      todayOpeningHours = openingHours.monday;
      break;
    case 2:
      todayOpeningHours = openingHours.tuesday;
      break;
    case 3:
      todayOpeningHours = openingHours.wednesday;
      break;
    case 4:
      todayOpeningHours = openingHours.thursday;
      break;
    case 5:
      todayOpeningHours = openingHours.friday;
      break;
    case 6:
      todayOpeningHours = openingHours.saturday;
      break;
    default:
      return false;
  }

  if (!todayOpeningHours) {
    return false;
  }

  const openingTime =
    parseInt(todayOpeningHours.from.split(":")[0]) * 60 +
    parseInt(todayOpeningHours.from.split(":")[1]);
  const closingTime =
    parseInt(todayOpeningHours.to.split(":")[0]) * 60 +
    parseInt(todayOpeningHours.to.split(":")[1]);

  return currentTime >= openingTime && currentTime <= closingTime;
};
