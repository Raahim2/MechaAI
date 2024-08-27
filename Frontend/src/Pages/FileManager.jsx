import {React  , useState } from "react";
import { useLocation , Navigate} from "react-router-dom";
import "../CSS/output.css"
import "../CSS/others.css"
import Navbar from "../Components/Navbar";
import FileSidebar from "../Components/FileSidebar";
import FileViewer from "../Components/FileViewer";
import FileFeatures from "../Components/FileFeatures";

function FileManager(username) {
  const location = useLocation()
  const isAuthenticated = location.state?.isAuthenticated || false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const [selectedFilePath, setSelectedFilePath] = useState('/Uploads/Document/pd1.pdf');
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(null);


  const handleFileClick = (filePath) => {
    setSelectedFilePath(filePath)
  };
    
  

  return (
    <>
    <Navbar username={username} download={true} fileUrl={selectedFilePath}/>

    <div className="flex pt-20"> 
      <FileSidebar onFileClick={handleFileClick}/>
      <FileViewer filepath={selectedFilePath} selectedColumnIndex={selectedColumnIndex} setSelectedColumnIndex={setSelectedColumnIndex}/>
      <FileFeatures filePath={selectedFilePath} selectedCol={selectedColumnIndex} setfilepath={setSelectedFilePath}/> 
    </div>
   
    
    </>
  );
}

export default FileManager;
