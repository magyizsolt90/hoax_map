import { useStore } from "../context/store";
import { isOpenNow } from "../functions";
import Icon from "./ui/Icon";
import { ListItemProps } from "../types";
import { CafeType } from "../types"; // Adjust the path as necessary

export const IconMapping: Record<CafeType, string> = {
  [CafeType.CAFE]: "/icons/cafeTypes/cafe.svg",
  [CafeType.RESTAURANT]: "/icons/cafeTypes/restaurant.svg",
  [CafeType.BAR]: "/icons/cafeTypes/bar.svg",
  [CafeType.TRUCK]: "/icons/cafeTypes/truck.svg",
  [CafeType.DELICATES]: "/icons/cafeTypes/deli.svg",
  [CafeType.SHOP]: "/icons/cafeTypes/market.svg",
  [CafeType.STUDIO]: "/icons/cafeTypes/studio.svg",
  [CafeType.BISTRO]: "/icons/cafeTypes/bistro.svg",
  [CafeType.PASTRY_SHOP]: "/icons/cafeTypes/sweet.svg",
  [CafeType.BAKERY]: "/icons/cafeTypes/bakery.svg",
  [CafeType.GUESTHOUSE]: "/icons/cafeTypes/motel.svg",
  [CafeType.COMMUNITY_VENUE]: "/icons/cafeTypes/coworking.svg",
};
const ListItem = ({ venueId, map }: ListItemProps) => {
  const { venues, setSelectedVenue } = useStore();

  const venue = venues.find((v) => v.id === venueId);

  if (!venue) {
    return null;
  }

  const isOpen = isOpenNow(venue.openingHours);

  const handleClick = () => {
    setSelectedVenue(venue);
  };

  const venueIcon =
    IconMapping[venue.type] || "/icons/cafeTypes/cafeType_cafe.svg";

  return (
    <div
      onClick={handleClick}
      className={`p-5 rounded-[20px] shadow-md flex flex-col space-y-2 cursor-pointer ${
        map
          ? "bg-zinc-100 bg-opacity-10 rounded-[30px] shadow-gray shadow-lg backdrop-blur-md w-[310px]"
          : "hover:bg-gray-700 "
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg flex flex-row items-center gap-2">
          <Icon src={venueIcon} alt="VenueIcon" />
          <span className={isOpen || map ? "text-white" : "text-zinc-500"}>
            {venue.name}
          </span>
        </span>
      </div>
      <span
        className={` ${
          isOpen || map ? "text-white" : "text-zinc-500"
        } font-light text-base flex flex-row itemc-center gap-2`}
      >
        <span className="font-rubik">
          {venue.city}, {venue.street}
        </span>
        {isOpen && (
          <>
            <div className="font-bold"> &middot; </div>

            <span
              className={`
               text-green-500 
             font-medium text-base`}
            >
              nyitva
            </span>
          </>
        )}
      </span>
      <div className="flex flex-row items-center">
        <Icon
          src={isOpen || map ? "/icons/whiteBean.svg" : "/icons/grayBean.svg"}
          alt="Jar"
          className="mr-1"
        />
        <div
          id="vertically divider"
          className={`h-3 w-[2px] mr-2 ${
            isOpen || map ? "bg-white" : "bg-zinc-500"
          }`}
        />
        <span
          className={`${
            isOpen || map ? "text-white" : "text-zinc-500"
          } text-sm font-medium  font-rubik`}
        >
          {venue.beansInTheGrinder.join(", ")}
        </span>
      </div>
    </div>
  );
};

export default ListItem;
