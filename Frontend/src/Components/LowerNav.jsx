import {React , useState , useEffect} from "react";
import "../CSS/output.css"
import "../CSS/others.css"
import axios from "axios";
import Feature from "../Components/Feature";
import ProgressBar from "./Progress";

function LowerNav({FUNCTIONS  ,setimagepath ,initialpath , selected,setSelected}) {

    function show(toshowID , tohideID , item) {
        let toshow = document.getElementById(toshowID)
        let tohide = document.getElementById(tohideID)
        tohide.classList.add('hidden')
        toshow.classList.remove('hidden')
        setSelected(item)
    }

    function updateImage(){
      axios.post(`http://127.0.0.1:5000/UpdateInitial`, 
        {
          path: initialpath
        },
        {
          headers: {
            'Content-Type': 'application/json'  
          }
        }
      )
      .then((response) => {
          if (response.data === "SUCCESS") {
              console.log('updated image')
          } else {
              console.error('Task not implemented or failed:', response.data);
          }
      })
      .catch((error) => {
          console.error('Error communicating with backend:', error);
      });

    }

    function sendReq(item ) {
      console.log('Image path:', initialpath);  
    
      axios.post(`http://127.0.0.1:5000/editor/${item}`, 
        {
          path: initialpath
        },
        {
          headers: {
            'Content-Type': 'application/json'  
          }
        }
      )
      .then((response) => {
          if (response.data === "SUCCESS") {
              const timestamp = new Date().getTime(); 
              setimagepath(`/Output/output.png?t=${timestamp}`);
              if(FUNCTIONS['rotate'].includes(item)){
                updateImage()
              }
              
          } else {
              console.error('Task not implemented or failed:', response.data);
          }
      })
      .catch((error) => {
          console.error('Error communicating with backend:', error);
      });
    }


    const keys = Object.keys(FUNCTIONS)



  return (
    <>


    <nav className="bg lower fixed bottom-0 left-0 w-full" id="mainNav">
        <div className="flex justify-around p-4" >
        {keys.map((item, index) => (
            <div onClick={() => show(index , "mainNav" , item)}>
            <Feature name={item} path={`/Feature/components/${item}.svg`} />
            </div>
        ))}
        </div>
    </nav>
    <div>
    
    

    
            {Object.keys(FUNCTIONS).map((key, index) => (
                <nav key={index} id={index} className="bg-lower fixed bottom-0 left-0 w-full lower hidden">
                {selected === "adjust" && (
                  <div className="px-8">
                    <ProgressBar />
                  </div>
                )}

                    <div className="flex justify-around p-4">
                    <div onClick={() => {show("mainNav" , index); updateImage()}} >
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
