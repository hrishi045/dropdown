import React from "react";
import Dropdown from "./components/Dropdown";
import opt from "./data.json";

const App = () => {
  return (
    <div className="App">
      <Dropdown options={opt} />
    </div>
  );
};

export default App;
