import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/pages/HomePage";
import AdminManager from "./components/pages/adminDashboard";
import Documents from "./components/pages/Documents";


import "./index.css"; // Your global styles (tailwind.css, etc.)
// import SidebarContentNew from "./components/SidebarContentNew";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      {/* <SidebarContentNew /> */}
      <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminManager />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
