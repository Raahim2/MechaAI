import {React , useState } from "react";
import "../CSS/output.css"

function Navbar({username , download , fileUrl}) {
  const handleShare = async () => {
    try {
      if (navigator.canShare && navigator.canShare({ url: fileUrl} )) {
        await navigator.share({
          title: 'Check out this file!',
          text: 'Here is a file I wanted to share with you.',
          url: fileUrl,
        });
        console.log('File shared successfully');
      } else {
        handleEmailShare();
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleEmailShare = () => {
    const subject = 'Check out this file!';
    const body = `I wanted to share this file with you: ${fileUrl}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
    <nav className="fixed top-0 z-40 w-full border-b border-gray-200 bg border-gray-700">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                 <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
           </button>
          <a href="" className="flex ms-2 md:me-24">
            <img src="/Logo/logoai.webp" className="h-8 me-3" alt="Logo" />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Mecha AI</span>
          </a>
        </div>
        
          
          {download ? ( 
   
             <div className="flex">
              <div onClick={handleDownload}>
                <p className="text-white m-2"></p>
                <button type="button" className="mx-4 p-3 text-sm font-medium focus:outline-none bg2 text-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Download</button>
              </div>
              <div onClick={handleShare} >
                <p className="text-white m-2"></p>
                <button type="button" className="mx-4 p-3 text-sm font-medium focus:outline-none bg2 text-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Share</button>
              </div>
          
            </div>
          ) : (
           <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                </button>
              </div>
              <p className="text-white m-2">{username}</p>
            </div>
          </div> 
          )}
          
      </div>
    </div>
    </nav>
    </>
  );
}

export default Navbar;
