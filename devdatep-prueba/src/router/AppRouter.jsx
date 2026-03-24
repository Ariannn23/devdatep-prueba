import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CharacterDetail from "../pages/CharacterDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
    </Routes>
  );
};

export default AppRouter;