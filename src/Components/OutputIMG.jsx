import {React , useState ,useRef} from "react";
import axios from "axios";
import "../CSS/output.css"
import "../CSS/others.css"

function OutputIMG({ imgpath }) {
  const fileInputRef = useRef(null);
  const [uploaded, setUploaded] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File successfully uploaded', response.data);
        setUploaded(true)
      } catch (error) {
        console.error('Error uploading the file', error.response ? error.response.data : error.message);
      }
    }
  };

 

  return (
    <>
    <input type="file" onChange={handleFileChange} ref={fileInputRef} accept="image/*"  id="hiddenfile" className="hidden"/>



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

        <div className="absolute bottom-0 center-0  p-2 m-5 flex">
            <img src="/Feature/general/back.svg"alt="" className="rotate-180 invert mx-4 my-2"/>
        </div>
    
        <div className="absolute bottom-0 right-0 bg2 p-2 m-5 rounded-full flex" onClick={() => handleButtonClick()}>
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
