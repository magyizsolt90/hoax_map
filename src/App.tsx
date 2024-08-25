import React from "react";
import List from "./components/List";
import Map from "./components/MyMap";
import MoveButton from "./components/MoveButton";

const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-row relative">
        <List />
        <Map />
      </div>
      <MoveButton />
    </>
  );
};

export default App;
