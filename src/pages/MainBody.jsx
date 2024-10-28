import React from "react";
import { Route, Routes } from "react-router";
import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import Teachers from "./Teachers";
import Courses from "./Courses";
import Groups from "./Groups";

export default function MainBody() {
  return (
    <div className="mainBody">
      <Navbar />
      <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/teachers" element={<Teachers/>}/>
      <Route path="/groups" element={<Groups/>}/>
      </Routes>
    </div>
  );
}
