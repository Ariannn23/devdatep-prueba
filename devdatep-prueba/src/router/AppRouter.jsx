import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CharacterDetail from "../pages/CharacterDetail";
import MissionsPage from "../pages/MissionsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/missions" element={<MissionsPage />} />
    </Routes>
  );
};

export default AppRouter;