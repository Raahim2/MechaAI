import {React , useState ,useEffect} from "react";
import axios from "axios";
import "../CSS/output.css"
import "../CSS/others.css"


function FileSidebar({onFileClick }) {
  const [fileData, setFileData] = useState({
    Code: [],
    Document: [],
    Excel: [],
    Image: []
  });

  const filetypes = ['Code' , 'Document' , 'Excel' , 'Image'];


  function show(id){
    let toshow = document.getElementById(id);
    let torot = document.getElementById('img'+id)

    if(toshow.classList.contains('hidden')){
      toshow.classList.remove('hidden');
      torot.classList.add('-rotate-90')


    }else{
      toshow.classList.add('hidden');
      torot.classList.remove('-rotate-90')
      torot.classList.add('rotate-180')
    }
  }

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fetchUploads');
        const data = response.data;
        
        setFileData({
          Code: data.code,
          Document: data.docs,
          Excel: data.excel,
          Image: data.imgs
        });
      } catch (error) {
        console.error('Error fetching files:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchFiles();
  }, []);
  
    

  return (
    <>
    <aside id="logo-sidebar" className="text-white  top-0 left-0 z-40 w-1/4 transition-transform -translate-x-full bg-white border-r  border-gray-700 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar" style={{ height: 'calc(100vh - 5rem)' }}>
       <div className="h-full  px-3 pb-4 overflow-y-auto bg dark:bg-gray-800">
          <ul className="space-y-2 font-medium">

            {filetypes.map((filetype , index)=> (
              <li >
                <a onClick={() => show(index)} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900  group">
                   <img src="/Feature/general/back.svg" alt="" className="invert rotate-180 group-hover:invert-0" id={'img'+index}/>
                   <span className="ms-3">{filetype}</span>
                </a>
                <div className="hidden" id={index} >       
                  <ul className="mx-4  text-left  dark:text-gray-400">
                    {fileData[filetype].map((file,index) => (
                      <li className="p-2 flex items-center space-x-3 rtl:space-x-reverse" onClick={() => onFileClick(`/Uploads/${filetype}/${file}`)}>
                        <img src="/Feature/general/file.svg" alt="" />
                        <span className="">{file}</span>
                     </li>
                    ))}
                  </ul>
                </div>
             </li>
            ))}
             



             
          </ul>
       </div>
    </aside>
    
    </>
  );
}

export default FileSidebar;
