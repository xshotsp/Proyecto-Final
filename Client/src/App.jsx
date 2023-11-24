import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import CreateUserForm from "./components/createUserForm/CreateUserForm";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createuser" element={<CreateUserForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
