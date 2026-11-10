




import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/Home";
import Dashbord from "./pages/Dashbord";
import Employees from "./pages/Employees";
import MainLayout from "./components/MainLayout";
import Departments from "./pages/Department";
import Projects from "./pages/Projects";
import Finance from "./pages/Finance";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";

import { EmployeeProvider } from "./components/EmployeeContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <Login onLogin={() => setIsLoggedIn(true)} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          {isLoggedIn && (
            <Route element={<MainLayout />}>

              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashbord />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/reports" element={<Reports />} />

            </Route>
          )}

          <Route
            path="*"
            element={
              <Navigate
                to={isLoggedIn ? "/home" : "/"}
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
