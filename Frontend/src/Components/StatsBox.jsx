import {React , useState } from "react";
import "../CSS/output.css"

function StatsBox() {

  return (
    <>
    <div className="p-4 bg sm:ml-64">
<div className="p-4 bg rounded-lg dark:border-gray-700 mt-14">

    <div className="flex space-x-4 p-6">
        
        <div className="flex items-center bg2 p-8 rounded-lg shadow-lg w-64">
            <svg className="w-10 h-10 mr-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 0110-4.472V10H4zm6 6a6 6 0 01-10-4.472V10h10v6z"/>
            </svg>
            <div>
                <p className="text-sm text-gray-400">Total Images Edited</p>
                <p className="text-xl font-bold text-white">3</p>
            </div>
        </div>

        <div className="flex items-center bg2 p-8 rounded-lg shadow-lg w-64">
            <svg className="w-10 h-10 mr-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 0110-4.472V10H4zm6 6a6 6 0 01-10-4.472V10h10v6z"/>
            </svg>
            <div>
                <p className="text-sm text-gray-400">Likes</p>
                <p className="text-xl font-bold text-white">1678</p>
            </div>
        </div>

        <div className="flex items-center bg2 p-8 rounded-lg shadow-lg w-64">
            <svg className="w-10 h-10 mr-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 0110-4.472V10H4zm6 6a6 6 0 01-10-4.472V10h10v6z"/>
            </svg>
            <div>
                <p className="text-sm text-gray-400">Profile View</p>
                <p className="text-xl font-bold text-white">672</p>
            </div>
        </div>

        <div className="flex items-center bg2 p-8 rounded-lg shadow-lg w-64">
            <svg className="w-10 h-10 mr-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 0110-4.472V10H4zm6 6a6 6 0 01-10-4.472V10h10v6z"/>
            </svg>
            <div>
                <p className="text-sm text-gray-400">Followers</p>
                <p className="text-xl font-bold text-white">23</p>
            </div>
        </div>
        
        
    </div>

    <div className="flex space-x-4 p-6">
        <div className="flex flex-col items-center bg2 p-6 rounded-lg shadow-lg w-1/2">
            <p className="text-center text-2xl text-white mb-4">Image Edited Statistics</p>
            <img src="/Graph/statistics_pie_chart.png" alt="Graph Image" className="w-full"/>
        </div>

        <div className="flex flex-col items-center bg2 p-6 rounded-lg shadow-lg w-1/2">
            <p className="text-center text-2xl text-white mb-4">Image Edited Statistics</p>
            <img src="/Graph/statistics_bar_chart.png" alt="Graph Image" className="w-full"/>
        </div>

    </div>
    

</div>
</div>
    </>
  );
}

export default StatsBox;
