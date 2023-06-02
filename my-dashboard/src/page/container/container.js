import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../page/Sidebar/nav.js";
import "./container.css";

export default function DashboardContainer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="adminContainer" style={{display:'flex'}}>

      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div className=""></div>
      <div style={{width:"100%"}}>
        <Outlet />
      </div>
    </div>
  );
}