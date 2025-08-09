import "./App.css";
import MangaCard from "./Components/MangaCard";
import MangaDetails from "./Pages/MangaDetails";
import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Reader from "./Pages/Reader";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga/:id" element={<MangaDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/read/:chapterId" element={<Reader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
