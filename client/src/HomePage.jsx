import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen border border-gray-300">
      <Header />
      <Navbar />
      <MainSection />
    </div>
  );
};

export default HomePage;