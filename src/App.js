import React from "react";
import "antd/dist/antd.css";
import MenuTop from './components/MenuTop.tsx';
import Content from './components/Content.tsx';
import Carousel from './components/Carousel.tsx';
function App() {
  return (
   <>
    <MenuTop/>
    <Carousel/>
    <Content/>
    </>

  );
}

export default App;
