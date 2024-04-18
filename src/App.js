import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar"; // Votre composant avec la sidebar
// import Bonjour from "./Bonjour";
import Visites from "./Visites/Visites";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Layout from "./Layout";
import AuthWrapper from "./AuthWrapper";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Sidebar />}>
    //       <Route index element={<Dashboard />} />
    //       <Route path="dashboard" element={<Dashboard />} />
    //       <Route path="visites" element={<Visites />} />
    //       {/* Ajoutez d'autres routes si nécessaire */}
    //     </Route>
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthWrapper />}>
          {/* Layout n'est plus une route index ici */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="visites" element={<Visites />} />
            {/* Ajoutez d'autres routes protégées ici */}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
