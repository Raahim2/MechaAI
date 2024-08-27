import {React , useState , useEffect} from "react";
import { useLocation , Navigate} from "react-router-dom";
import "../CSS/output.css"
import "../CSS/others.css"
import Navbar from "../Components/Navbar";
import LowerNav from "../Components/LowerNav";
import OutputIMG from "../Components/OutputIMG";


function Editor({username }) {
  const [selected, setSelected] = useState();
  const location = useLocation()
  const isAuthenticated = location.state?.isAuthenticated || false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const [imagepath ,  setimgpath] = useState('/Output/uplode.jpg');
  const [uploaded, setUploaded] = useState(false);
  const [initialpath, setInitialpath] = useState();
  const { hi } = location.state || { hi: null};
  useEffect(() => {
    if (hi) {
        setInitialpath(hi);
        setimgpath(hi);
        setUploaded(true);
    }
}, [hi]); 


    const FUNCTIONS = {
        'filters':['grey','blur','canny','dilate','erod','th','transform','cartoon','vin','inv','poison'],
        'cropping':['crop 1_2','crop 16_9','crop 9_6' ,'crop 3_4' , 'crop 4_3'],
        'rotate':['Horizontal Flip' , 'Vertical Flip' , 'Rotate Right' , 'Rotate Left' , 'Zoom'],
        'adjust':['Bright','Dark','Exposure','Contrast','Saturation','Hue'],
        'text':['Rectangle','Line','Circle','Text'],
        'ai':['Object Detection','Face Mesh','Background Remover' , 'Enhance']
    }
  

  return (
    <>
    <Navbar username={username} download={true}/>
    <LowerNav FUNCTIONS={FUNCTIONS} setimagepath={setimgpath} initialpath={initialpath} selected={selected} setSelected={setSelected}/>
    <OutputIMG imgpath={imagepath} setimgpath={setimgpath} setInitialImagePath={setInitialpath} uploaded={uploaded} setUploaded={setUploaded} selected={selected} setSelected={setSelected}/>
    
    </>
  );
}

export default Editor;
