import "./App.css";
import Header from "./components/Header";
import AllRoutes from "./components/AllRoutes";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AllRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
