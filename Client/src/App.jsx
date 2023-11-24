import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./Components/Home/HomePage";
import Footer from "./Components/Footer/Footer";
import CreateUserForm from "./components/createUserForm/CreateUserForm";

function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      {pathname === "/" || pathname === "/createuser" ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createuser" element={<CreateUserForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
