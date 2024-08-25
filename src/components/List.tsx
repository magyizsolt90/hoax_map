import { useStore } from "../context/store";
import ListItem from "./ListItem";

export default function List() {
  const { venues } = useStore();

  return (
    <div className="flex flex-col w-[100%] bg-black text-white p-4">
      <span className="font-thin text-2xl leading-[60px] font-rubik">
        HOAX coffee
      </span>
      <span className="font-bold text-4xl font-rubik">SPECIALITY LOCATOR</span>
      <br />
      <div className=" max-h-[80vh] overflow-y-auto ">
        {venues.map((venue) => (
          <>
            <ListItem key={venue.id} venueId={venue.id} />
            <div className="border-t border-gray-800 "></div>
          </>
        ))}
      </div>
    </div>
  );
}
