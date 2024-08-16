import {React , useState } from "react";
import axios from "axios";
import { useNavigate  , useParams} from 'react-router-dom'; 
import "../CSS/output.css"
import Navbar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import StatsBox from "../Components/StatsBox";
import PlusIcon from "../Components/PlusIcon";

function Dashboard() {
    const { username } = useParams();
  

  return (
    <>
    <Navbar username={username}/>
    <SideBar username={username}/>
    <StatsBox/>
    <PlusIcon username={username}/>
    </>
  );
}

export default Dashboard;
