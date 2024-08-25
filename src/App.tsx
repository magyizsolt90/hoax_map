import React from "react";
import List from "./components/List";
import Map from "./components/Map";

const App: React.FC = () => {
  return (
    <div className="flex flex-row">
      <List />
      <Map />
    </div>
  );
};

export default App;
