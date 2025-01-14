import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";

const AppRoutes: React.FC = () => 
{
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;