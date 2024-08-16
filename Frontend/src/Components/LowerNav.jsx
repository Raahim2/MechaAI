import {React , useState } from "react";
import "../CSS/output.css"
import "../CSS/others.css"
import axios from "axios";
import Feature from "../Components/Feature";
import OutputIMG from "./OutputIMG";

function LowerNav({FUNCTIONS}) {
    const [imageSrc, setImageSrc] = useState('/Output/output.png');

    function show(toshowID , tohideID) {
        let toshow = document.getElementById(toshowID)
        let tohide = document.getElementById(tohideID)
        tohide.classList.add('hidden')
        toshow.classList.remove('hidden')
    }

   

    function sendReq(req){
        axios.post(`http://127.0.0.1:5000/editor/${req}`, {
            headers: {
              'Content-Type': 'application/json'  
            }
          })
            .then(response => {
              if(response.data=="SUCCESS"){
                setImageSrc(`/Output/output.png?t=${new Date().getTime()}`);
              }
            })
            .catch(error => {
              console.log("There was an error submitting the data!", error);
            });
    }

    const keys = Object.keys(FUNCTIONS)



  return (
    <>
    <OutputIMG imgpath={imageSrc} />

    <nav className="bg lower fixed bottom-0 left-0 w-full lower" id="mainNav">
        <div className="flex justify-around p-4" >
        {keys.map((item, index) => (
            <div onClick={() => show(index , "mainNav")}>
            <Feature name={item} path={`/Feature/components/${item}.svg`} />
            </div>
        ))}
        </div>
    </nav> 

    <div>
            {Object.keys(FUNCTIONS).map((key, index) => (
                <nav key={index} id={index} className="bg-lower fixed bottom-0 left-0 w-full lower hidden">
                    <div className="flex justify-around p-4">
                    <div onClick={() => show("mainNav" , index)}>
                        <Feature name="back" path='/Feature/general/back.svg' />
                    </div>
                        {FUNCTIONS[key].map((item, itemIndex) => (
                            <div onClick={() => sendReq(item)}>   
                            <Feature key={itemIndex} name={item} path={`/Feature/${key}/${item}.${key === "filters" || key === "adjust" ? "png" : "svg"}`}  />
                            </div>
                        ))}
                    </div>
                </nav>
            ))}
        </div>

    </>
  );
}

export default LowerNav;
