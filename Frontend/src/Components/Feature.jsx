import React from "react";

function Feature({name , path}) {
  return (
    <>
    <div className="flex flex-col items-center" >
        <img src={path} alt="" className="invert" width={30}/>
        <span className="text-s text-white">{name}</span>
    </div> 
    </>
  );
}

export default Feature;
