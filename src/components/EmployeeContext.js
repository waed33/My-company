
import React, { createContext, useContext, useState, useEffect } from "react";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("omnicore_employees");

    if (savedEmployees) {
      try {
        return JSON.parse(savedEmployees);
      } catch {
        return [];
      }
    }

    return [
      { id: 1, name: "John Smith", email: "john@company.com", department: "IT", position: "IT Manager", status: "Active" },
      { id: 2, name: "Sarah Wilson", email: "sarah@company.com", department: "HR", position: "HR Manager", status: "Active" },
      { id: 3, name: "David Brown", email: "david@company.com", department: "Marketing", position: "Marketing Specialist", status: "Active" },
      { id: 4, name: "Emily Davis", email: "emily@company.com", department: "Finance", position: "Accountant", status: "Inactive" },
      { id: 5, name: "Michael Lee", email: "michael@company.com", department: "Sales", position: "Sales Executive", status: "Active" },
      { id: 6, name: "Olivia Taylor", email: "olivia@company.com", department: "IT", position: "Developer", status: "Active" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("omnicore_employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(EmployeeContext);
}
