import React, { useEffect } from "react";
import getVenues from "./API/api";

const App: React.FC = () => {
  useEffect(() => {
    getVenues();
  }, []);

  return (
    <div>
      <h1>Check the console for API response</h1>
    </div>
  );
};

export default App;
