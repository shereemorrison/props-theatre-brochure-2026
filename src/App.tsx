import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import LandingPage from "./pages/LandingPage";
import DayPage from "./pages/DayPage";
import StagePage from "./pages/StagePage";
import Credits from "./pages/Credits";
import Contact from "./pages/Contact";
import Staffing from "./pages/Staffing";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage showMenu={true} />} />
        <Route path="/day/thursday-3rd" element={<Navigate to="/day/thursday-friday" replace />} />
        <Route path="/day/friday-4th" element={<Navigate to="/day/thursday-friday" replace />} />
        <Route path="/day/:dayId" element={<DayPage />} />
        <Route path="/stage/:stageId" element={<StagePage />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/acknowledgements" element={<Credits />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/staffing" element={<Staffing />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;

