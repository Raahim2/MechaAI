import {React , useState ,useRef} from "react";
import axios from "axios";
import "../CSS/output.css"
import "../CSS/others.css"
import Alert from "../Components/Alert"

function OutputIMG({ imgpath  , setimgpath  , setInitialImagePath ,uploaded , setUploaded}) {
  
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  


function uploadFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  axios.post('http://127.0.0.1:5000/uploadFile', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  })
  .then((response) => {
      console.log('File uploaded successfully:', response.data);
      setAlert({
        message: 'File Uploaded Successfully',
        type: 'SUCCESS',
        visible: true
      });
      setUploaded(true)
      setimgpath(`/Uploads/Image/${file.name}`)
      setInitialImagePath(`/Uploads/Image/${file.name}`)
  })
  .catch((error) => {
      console.error('Error uploading file:', error);
  });
}

 

  return (
    <>
    {alert.visible && <Alert message={alert.message} type={alert.type} setvisible={setAlert}/>}



    <input type="file" accept="image/*"  id="hiddenfile" className="hidden" onChange={uploadFile}/>

    <div className="bg outer border-b border-gray-700 flex justify-center items-center relative" id="maindiv">
        <div className="border bg-gray-100">
        {uploaded ? (
        <img src={imgpath} alt="Upload" className="image"/>
       ) : ( 
         <img src='/Output/uplode.jpg' alt="Upload" className="image"/> 
        
      )} 
        </div>
    
        <div className="absolute bottom-0 left-0 bg2 p-2 m-5 rounded-full flex">
            <img src="/Feature/general/back.svg" alt="" className="invert mx-4 my-2" />
            <img src="/Feature/general/back.svg"alt="" className="rotate-180 invert mx-4 my-2"/>
        </div>

        
    
        <div className="absolute bottom-0 right-0 bg2 p-2 m-5 rounded-full flex" onClick={() => document.getElementById('hiddenfile').click()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none" className="invert mx-4 my-2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                <path d="M12 8L12 16M12 8C11.2998 8 9.99153 9.9943 9.5 10.5M12 8C12.7002 8 14.0085 9.9943 14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>

    </div>
    </>
  );
}

export default OutputIMG;
