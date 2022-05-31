import React from "react";
import "antd/dist/antd.css";
import MenuTop from "./components/MenuTop.tsx";
import Content from "./components/Content.tsx";
import Detail from "./components/Detail.tsx";
import { Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
}

function HomePage() {
  return (
    <>
      <MenuTop />
      <Content />
    </>
  );
}

function DetailPage() {
  return (
    <>
      <MenuTop />
      <Detail />
    </>
  );
}

export default App;
