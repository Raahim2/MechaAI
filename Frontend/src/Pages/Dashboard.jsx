import {React , useState } from "react";
import {  useParams , useLocation , Navigate} from 'react-router-dom'; 

import "../CSS/output.css"
import Navbar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import StatsBox from "../Components/StatsBox";
import PlusIcon from "../Components/PlusIcon";

function Dashboard() {
  const { username } = useParams();
  const location = useLocation();
  const isAuthenticated = location.state?.isAuthenticated || false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  

  return (
    <>
    <Navbar username={username}/>
    <SideBar username={username}/>
    <StatsBox/>
    <PlusIcon username={username} isAuthenticated={isAuthenticated}/>
    </>
  );
}

export default Dashboard;
