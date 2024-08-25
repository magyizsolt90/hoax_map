import React from "react";
import List from "./components/List";
import Map from "./components/MyMap";
import MoveButton from "./components/MoveButton";
import { useStore } from "./context/store";
import Loader from "./components/ui/Loader";

const App: React.FC = () => {
  const { error, loading } = useStore();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="flex flex-row relative">
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
      </div>
      <MoveButton />
    </>
  );
};

export default App;
