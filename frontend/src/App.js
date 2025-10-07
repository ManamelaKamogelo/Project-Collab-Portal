import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/AuthProvider";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import StudentDashboard from "./components/StudentDashboard";
import SupervisorDashboard from "./components/SupervisorDashboard";
import GroupLeaderDashboard from "./components/GroupLeaderDashboard";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("access_token");

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adduser" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route
              path="/supervisor-dashboard"
              element={<SupervisorDashboard />}
            />
            <Route
              path="/group-leader-dashboard"
              element={<GroupLeaderDashboard />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
