import React from "react";
import List from "./components/List";
import Map from "./components/MyMap";
import MoveButton from "./components/MoveButton";
import { useStore } from "./context/store";
import Loader from "./components/ui/Loader";
import Icon from "./components/ui/Icon";
import MobileView from "./components/MobileView";

const App: React.FC = () => {
  const { error, loading } = useStore();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="hidden md:flex flex-row relative">
        <a href="https://www.hoaxcoffee.com/" target="_blank" rel="noreferrer">
          <Icon
            className="absolute top-5 right-5 w-[80px] h-[80px] z-50 cursor-pointer fill-white"
            src="/icons/hoax.svg"
            alt="Hoax"
          />
        </a>
        {loading ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center ">
            <Loader />
          </div>
        ) : (
          <>
            <List />
            <Map />
          </>
        )}
        <MoveButton />
      </div>

      <div className="flex md:hidden h-screen items-center justify-center flex-col bg-gradient-custom">
        <MobileView />
      </div>
    </>
  );
};

export default App;
