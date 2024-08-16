import React from "react";

function Feature({name , path}) {
  return (
    <>
    <div class="flex flex-col items-center" >
        <img src={path} alt="" class="invert" width={30}/>
        <span class="text-s text-white">{name}</span>
    </div> 
    </>
  );
}

export default Feature;
