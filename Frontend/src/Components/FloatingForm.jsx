import React, { useState } from 'react';
import axios from 'axios';

const FloatingForm = ({ selectedcol, filepath, task , setfilepath , setvisible}) => {
  

  const [selectedOption, setSelectedOption] = useState(null);

  function hide() {
    // document.getElementById('floatingform').classList.add('hidden');
    setvisible(false)
  }

  function handleCheckboxChange(option) {
    setSelectedOption(option);
  }

  function sendFillNA() {
    const inputValue = document.getElementById('fillNAinput').value;

    const url = `http://localhost:5000/CSVEditor/${task}`;

    const formData = new FormData();
    formData.append('filepath', filepath);
    formData.append('selected', selectedcol);
    formData.append('input', inputValue);
    formData.append('checkbox', selectedOption);

    console.log(inputValue)
    console.log(selectedOption)

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.data === "SUCCESS") {
          hide()
          const timestamp = new Date().getTime();
          const newFilePath = `${filepath.split('?')[0]}?t=${timestamp}`;
          setfilepath(newFilePath);
      }
    })
    .catch(error => {
      console.error('There was an error fetching the data!', error);
    });
  }

  return (
    <div id='floatingform' className="fixed top-0 right-0 z-50 bg-gray-800 text-gray-200 p-2 rounded-md w-96">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <input
            id='fillNAinput'
            type="text"
            placeholder="Fill NA With"
            className="bg-gray-700 p-2 rounded-md w-full text-gray-200 placeholder-gray-400"
          />
        </div>

        <button className="bg-gray-700 p-2 rounded-md" onClick={hide}>
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
        <button className="bg-gray-700 p-2 rounded-md" onClick={sendFillNA}>
          <svg className="w-5 h-5 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </div>

      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-4 bg-gray-200 border-0" />
        <span className="absolute px-3 font-medium -translate-x-1/2 bg-gray-800 left-1/2 dark:text-white dark:bg-gray-900">or</span>
      </div>

      <div className="flex items-center justify-between space-x-2 mt-2 bg-gray-800">
        {['Mean', 'Median', 'Mode'].map(option => (
          <div key={option} className="flex items-center ps-2 px-2 border border-gray-200 rounded dark:border-gray-700">
            <input
              type="checkbox"
              checked={selectedOption === option}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ms-2 text-sm font-medium dark:text-gray-300">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingForm;
