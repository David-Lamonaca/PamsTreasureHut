import React from "react";
import AppRoutes from './Components/AppRoutes'
import './CSS/App.css'
import NavigationBar from "./Components/NavigationBar";
import Footer from "./Components/Footer";

const App: React.FC = () => 
{
  return (
      <div className="app-container">
        <NavigationBar/>
        <main className="content">
          <AppRoutes/>
        </main>
        <Footer/>
      </div>
  );
};

export default App
