import {React , useState ,useRef , useEffect} from "react";
import axios from "axios";
import "../CSS/output.css"
import FloatingFrom from "../Components/FloatingForm.jsx"

import Alert from "./Alert";


const FileFeatures = ({filePath ,selectedCol , setfilepath}) => {
  

  const fileInputRef = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const [form, setform] = useState({ task:'' , visible:false});
  const filepathUp = filePath.split('?')[0];
  const fileExtension = filepathUp.split('.').pop();
  const [FormNeeded, setFromNeeded] = useState(false);
  const [elements, setElements] = useState([]);

 

  useEffect(() => {
    if (fileExtension === 'csv') {
      setElements([
        { name: 'Fill NA', path: '/Feature/components/adjust.svg', form: true },
        { name: 'Drop', path: '/Feature/components/adjust.svg', form: false },
      ]);
    } else {
      setElements([
        { name: 'Enc PDF', path: '/Feature/components/adjust.svg', form: true },
        { name: 'DWG', path: '/Feature/components/adjust.svg', form: false },
      ]);
    }
  }, [fileExtension]);


  

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/uploadFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setAlert({
          message: 'File Uploaded Successfully',
          type: 'SUCCESS',
          visible: true
        });
        setUploaded(true)
      } catch (error) {
        console.error('Error uploading the file', error.response ? error.response.data : error.message);
      }
    }
  };

  function handelFeature(task , form) {
    const url = `http://localhost:5000/CSVEditor/${task}` ; 
  
    const formData = new FormData();
    formData.append('filepath', filePath);
    formData.append('selected', selectedCol);

    if(form){
      console.log('Form needed')
      setFromNeeded(true)
      setform({
        task: task,
      });
    }else{
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        if(response.data=="SUCCESS"){
          const timestamp = new Date().getTime();
          const newFilePath = `${filePath.split('?')[0]}?t=${timestamp}`;
          setfilepath(newFilePath);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
    }

    

}



  return (
    <>
    {FormNeeded && <FloatingFrom selectedcol={selectedCol} filepath={filePath} task={form.task} setfilepath={setfilepath} setvisible={setFromNeeded}/>}

    {alert.visible && <Alert message={alert.message} type={alert.type} setvisible={setAlert}/>}
    <input type="file" onChange={handleFileChange} ref={fileInputRef} accept="image/*"  id="hiddenfile" className="hidden"/>


    <div className="p-3 bg rounded-lg w-1/4">
    <p>{filePath}</p>
      <h2 className="text-lg font-semibold mb-4">Layout Elements</h2>
      <div className="flex flex-wrap justify-center">
        {elements.map((element) => (
          <div key={element.name} className="flex flex-col items-center justify-center w-20 h-20 p-4 bg2 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer m-2" onClick={() => handelFeature(element.name , element.form)}>
            <img src={element.path} alt={element.name} className="w-8 h-8 mb-2 invert" />
            <span className="text-sm font-medium text-center">{element.name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="absolute bottom-0 right-0 bg2 p-2 m-5 rounded-full flex" onClick={() => handleButtonClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none" className="invert mx-4 my-2">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
          <path d="M12 8L12 16M12 8C11.2998 8 9.99153 9.9943 9.5 10.5M12 8C12.7002 8 14.0085 9.9943 14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    </>
    

  );
  
};

export default FileFeatures;

