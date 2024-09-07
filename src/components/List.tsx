import { useStore } from "../context/store";
import ListItem from "./ListItem";
import Stores from "./Stores";

export default function List() {
  const { venues } = useStore();

  return (
    <div className="flex flex-col h-screen w-[30%] bg-black text-white p-4 z-10 relative">
      <span className="font-thin text-xl  font-rubik text-center ">
        HOAX coffee
      </span>

      <span className="font-bold text-2xl font-rubik text-center">
        SPECIALITY LOKÁTOR
      </span>
      <br />
      <div className="max-h-[80vh] overflow-y-auto scrollbar-hide">
        {venues.map((venue, index) => (
          <>
            <ListItem key={venue.id || index} venueId={venue.id} />
            <div className="border-t border-gray-800 "></div>
          </>
        ))}
      </div>
      <Stores />
    </div>
  );
}
