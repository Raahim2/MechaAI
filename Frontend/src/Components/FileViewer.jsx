import React, { useState , useEffect } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import axios from 'axios';
import "../CSS/output.css"
import "../CSS/scrollbar.css"



const FileViewer = ({ filepath , selectedColumnIndex , setSelectedColumnIndex }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [scale, setScale] = useState(1);
  const filepathUp = filepath.split('?')[0];
  const fileExtension = filepathUp.split('.').pop();

  console.log(fileExtension)
  console.log(filepath)

    const fetchCSVData = () => {
      console.log("Fetching csv data")
    
      let filename = `${filepath.split('/').pop().replace(/\//g, '_')}`
      // filename = filename.split('?')[0];
    
      console.log(filename)
      

      const url = `http://localhost:5000/fetchCSV/${filename}?t=${new Date().getTime()}`;

      axios.get(url)
          .then(response => {
              if (response.data) {
                  setColumns(response.data.columns);
                  setData(response.data.data);
              }
          })
          .catch(error => {
              console.error('Error fetching columns:', error);
          });
  };
  
  useEffect(() => {
    if (fileExtension === 'csv') {
        fetchCSVData();
        console.log("Updating...")
    }
}, [fileExtension, filepath ]); 


  const handleColumnClick = (index) => {
    setSelectedColumnIndex((prevIndex) => (prevIndex === index ? null : index));
    console.log(index)
  };




  if(fileExtension=='png'){
    const currentPath = location.pathname; 
    const newPath = currentPath.replace('/file', '/editor'); 
    const hi = filepath;
    const isAuthenticated = true;

    // navigate(newPath, { state:{ hi} });
    navigate(newPath, { state: { isAuthenticated, hi } });

  }
  

  const handleWheel = (e) => {
    console.log(e);
    if (e.deltaY < 0) {
      setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Maximum zoom level
    } else if (e.deltaY > 0) {
      setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Minimum zoom level
    }
  };



  return (
    <div
      className="w-full h-auto border-r  border-gray-700 overflow-hidden "
      // onWheel={handleWheel}
      // style={{ touchAction: 'none', transform: `scale(${scale})`, transformOrigin: '0 0' }}
    >

      {fileExtension === 'csv' ? (
        <div className="relative h-[89vh] overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className={`px-6 py-3 ${selectedColumnIndex === index ? 'border-blue-500 border' : 'border-gray-700'}`} onClick={() => handleColumnClick(index)}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg text-white">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 w-16 h-16 overflow-hidden text-ellipsis whitespace-nowrap ${selectedColumnIndex === colIndex ? 'border-blue-500 border-r border-l' : 'border-gray-700'}`}
                    onClick={() => handleColumnClick(colIndex)}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : fileExtension === 'png' ? (
        <div>
          <p>type is img special case2</p>

        </div>
      ) : (
        <embed src={filepath} type="" width="100%" height="100%" className='dark-scrollbar bg-white' />
      )}

    </div>
  );
};

export default FileViewer;
