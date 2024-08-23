import React from 'react';

const Alert = ({ type, message ,setvisible }) => {
  function hideAlert(){
    let a = document.getElementById('alert')
    setvisible({
      visible: false
    });
  }

  const baseClasses = "w-[95%] flex items-center p-4 m-2 border-t-4 rounded-lg shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50 text-sm font-medium";

  let alertClasses = "";
  let svgClasses = "";
  let buttonClasses = "";

  switch (type) {
    case 'DANGER':
      alertClasses = "text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800";
      svgClasses = "text-red-800 dark:text-red-400";
      buttonClasses = "bg-red-50 text-red-500 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700";
      break;
    case 'SUCCESS':
      alertClasses = "text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800";
      svgClasses = "text-green-800 dark:text-green-400";
      buttonClasses = "bg-green-50 text-green-500 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700";
      break;
    case 'WARNING':
      alertClasses = "text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:bg-gray-800 dark:border-yellow-800";
      svgClasses = "text-yellow-800 dark:text-yellow-400";
      buttonClasses = "bg-yellow-50 text-yellow-500 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700";
      break;
    default:
      alertClasses = "text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800";
      svgClasses = "text-gray-800 dark:text-gray-400";
      buttonClasses = "bg-gray-50 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700";
  }

  return (
    <div id="alert" className={`${baseClasses} ${alertClasses}`} role="alert">
      <svg className={`flex-shrink-0 w-4 h-4 ${svgClasses}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div className="ms-3">
        {message}
      </div>
      <button type="button" className={`ms-auto -mx-1.5 -my-1.5 ${buttonClasses} rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8`} data-dismiss-target="#alert-border-2" aria-label="Close" onClick={hideAlert}>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  );
}

export default Alert;
