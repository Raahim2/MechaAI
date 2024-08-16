import {React , useState } from "react";
import "../CSS/output.css"
import "../CSS/others.css"
import Navbar from "../Components/Navbar";
import LowerNav from "../Components/LowerNav";

function Editor(username) {
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
    {/* <OutputIMG imgpath={'/Output/output.png'}/> */}
    <LowerNav FUNCTIONS={FUNCTIONS}/>
    
    </>
  );
}

export default Editor;
