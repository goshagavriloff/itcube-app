import React from "react";
import {Routes,Route} from "react-router-dom";
import Home from "./container/Home";

function App() {
  return (
    <Routes>
      <Route path="/itcube-app/*" element={<Home/>}/>
    </Routes> 
  );
}
export default App;
