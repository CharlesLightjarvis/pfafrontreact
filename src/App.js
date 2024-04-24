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
import Personnels from "./Personnels/Personnels";
import EditPersonnels from "./Personnels/EditPersonnels/EditPersonnels";
import AjoutPersonnels from "./Personnels/AjoutPersonnels/AjoutPersonnels";
import Visiteurs from "./Visiteurs/Visiteurs";
import TypeVisiteurs from "./TypeVisiteurs/TypeVisiteurs";
import AjoutTypeVisiteurs from "./TypeVisiteurs/AjoutTypeVisiteurs/AjoutTypeVisiteurs";
import EditTypeVisiteurs from "./TypeVisiteurs/EditTypeVisiteurs/EditTypeVisiteurs";
import RaisonVisites from "./RaisonVisites/RaisonVisites";
import AjoutRaisonVisites from "./RaisonVisites/AjoutRaisonVisites/AjoutRaisonVisites";
import EditRaisonVisites from "./RaisonVisites/EditRaisonVisites/EditRaisonVisites";
import AjoutVisites from "./Visites/AjoutVisites/AjoutVisites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthWrapper />}>
          {/* Layout n'est plus une route index ici */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="visites" element={<Visites />} />
            <Route path="/visites/add" element={<AjoutVisites />} />
            <Route path="/raisonvisites" element={<RaisonVisites />} />
            <Route path="/raisonvisites/add" element={<AjoutRaisonVisites />} />
            <Route
              path="/raisonvisites/edit/:id"
              element={<EditRaisonVisites />}
            />
            <Route path="personnels" element={<Personnels />} />
            <Route path="/personnels/add" element={<AjoutPersonnels />} />
            <Route path="/personnels/edit/:id" element={<EditPersonnels />} />
            <Route path="/visiteurs" element={<Visiteurs />} />
            <Route path="/typevisiteurs" element={<TypeVisiteurs />} />
            <Route path="/typevisiteurs/add" element={<AjoutTypeVisiteurs />} />
            <Route
              path="/typevisiteurs/edit/:id"
              element={<EditTypeVisiteurs />}
            />
            {/* Ajoutez d'autres routes protégées ici */}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
