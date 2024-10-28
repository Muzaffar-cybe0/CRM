import axios from "axios";
import { useEffect} from "react";
import { Route, Routes, useNavigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar";
import MainBody from "./pages/MainBody";
import Courses from "./pages/Courses";
import Teachers from "./pages/Teachers";
import Groups from "./pages/Groups";
import Students from "./pages/Students";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login")
    } else {
      navigate("/dashboard")
    };
  },[])
 
    
  
  return (
    <div className="app">
     <Routes>
      <Route path="/" element={<MainBody />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/teachers" element={<Teachers/>}/>
      <Route path="/groups" element={<Groups/>}/>
      <Route path="/students" element={<Students/>}/>
     </Routes>
      
    </div>
  );
}

export default App;
