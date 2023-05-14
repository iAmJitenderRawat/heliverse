import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CustomTeam from "../pages/CustomTeam";
import NotFound from "../pages/NotFound";


const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customTeam" element={<CustomTeam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
