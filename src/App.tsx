import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
