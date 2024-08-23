import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Editor from "./Pages/Editor";
import FileManager from "./Pages/FileManager";

// npx tailwindcss -i ./src/CSS/input.css -o ./src/CSS/output.css --watch


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/:username" element={<Dashboard />} />
        <Route path="/:username/editor" element={<Editor />} />
        <Route path="/:username/file" element={<FileManager />} />


      </Routes>
    </Router>
  );
}

export default App
