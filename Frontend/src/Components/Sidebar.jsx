import {React , useState } from "react";
import "../CSS/output.css"
import { Link } from "react-router-dom";

function SideBar({username}) {

  return (
    <>
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform -translate-x-full bg border-r border-gray-200 sm:translate-x-0 " aria-label="Sidebar">
    <div className="h-full px-3 pb-4 overflow-y-auto bg">
    <ul className="space-y-2 font-medium">
    <Link to={`/${username}`}>
            <div  className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-white  transition duration-75  group-hover:text-gray-900 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <span className="ms-3">Dashboard</span>
            </div>
    </Link>
    <Link to={`/${username}/projects`}>
        <div  className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-white  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
            <span className="ms-3">Your Projects</span>
        </div>
    </Link>
    <Link to={'/login'}>
    <div  className="flex items-center p-2 text-white  rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 group">
        <svg className="flex-shrink-0 w-5 h-5 text-white  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
            </svg>
        <span className="ms-3">Sign In</span>
    </div>
    </Link>
    <Link to={'/signup'}>
    <div  className="flex items-center p-2 text-white  rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 group">
        <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
            </svg>
        <span className="ms-3">Sign up</span>
    </div>
    </Link>
    <Link to={`/${username}/projects`}>
        <div  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:bg-gray-700 group">
            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  fill="none">
                <path d="M10.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.12805 13.9629 11.2057 13.6118 14 14.4281" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M18.4332 13.8485C18.7685 13.4851 18.9362 13.3035 19.1143 13.1975C19.5442 12.9418 20.0736 12.9339 20.5107 13.1765C20.6918 13.2771 20.8646 13.4537 21.2103 13.8067C21.5559 14.1598 21.7287 14.3364 21.8272 14.5214C22.0647 14.9679 22.0569 15.5087 21.8066 15.9478C21.7029 16.1298 21.5251 16.3011 21.1694 16.6437L16.9378 20.7194C16.2638 21.3686 15.9268 21.6932 15.5056 21.8577C15.0845 22.0222 14.6214 22.0101 13.6954 21.9859L13.5694 21.9826C13.2875 21.9752 13.1466 21.9715 13.0646 21.8785C12.9827 21.7855 12.9939 21.6419 13.0162 21.3548L13.0284 21.1988C13.0914 20.3906 13.1228 19.9865 13.2807 19.6232C13.4385 19.2599 13.7107 18.965 14.2552 18.375L18.4332 13.8485Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
            <span className="ms-3">Manage Account</span>
        </div>
    </Link>
    </ul>
    </div>
</aside>
    </>
  );
}

export default SideBar;
