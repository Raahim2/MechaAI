import {React , useState } from "react";
import "../CSS/output.css"
import "../CSS/others.css"
import Navbar from "../Components/Navbar";
import GraphSide from "../Components/GraphSide"

function Graph() {
    
  

  return (
    <>
    <Navbar username="hi" download={false}/>
    <GraphSide/>
   
    
    </>
  );
}

export default Graph;
