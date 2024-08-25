import { OpeningHours, WeeklyOpeningHours } from "./types";

export const isOpenNow = (openingHours: WeeklyOpeningHours): boolean => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Percben kifejezett idő

  let todayOpeningHours: OpeningHours | null = null;

  // A nap alapján megkapjuk az adott nap nyitvatartását
  switch (currentDay) {
    case 0: // Vasárnap
      todayOpeningHours = openingHours.sunday;
      break;
    case 1: // Hétfő
      todayOpeningHours = openingHours.monday;
      break;
    case 2: // Kedd
      todayOpeningHours = openingHours.tuesday;
      break;
    case 3: // Szerda
      todayOpeningHours = openingHours.wednesday;
      break;
    case 4: // Csütörtök
      todayOpeningHours = openingHours.thursday;
      break;
    case 5: // Péntek
      todayOpeningHours = openingHours.friday;
      break;
    case 6: // Szombat
      todayOpeningHours = openingHours.saturday;
      break;
  }

  // Ha nincs nyitvatartás megadva a mai napra, akkor zárva van
  if (!todayOpeningHours) {
    return false;
  }

  // Átváltjuk a nyitvatartás időpontjait percekre
  const openingTime =
    parseInt(todayOpeningHours.from.split(":")[0]) * 60 +
    parseInt(todayOpeningHours.from.split(":")[1]);
  const closingTime =
    parseInt(todayOpeningHours.to.split(":")[0]) * 60 +
    parseInt(todayOpeningHours.to.split(":")[1]);

  // Ha a jelenlegi idő a nyitvatartási időn belül van, akkor nyitva van
  return currentTime >= openingTime && currentTime <= closingTime;
};
