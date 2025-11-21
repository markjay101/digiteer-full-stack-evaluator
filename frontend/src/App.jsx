import "./App.css";
import Tasks from "./Tasks";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { authService } from "./services/authService";

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout(); // remove token
    navigate("/login"); // redirect to login page
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="app d-flex flex-column">
              <button
                className="ms-auto btn btn-sm btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
              <h1>📝 React Task Evaluator</h1>
              <Tasks />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
