import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./view/admin/Dashboard";
import ManageFlights from "./view/admin/ManageFlights";
import EditFlight from "./view/admin/ManageFlights/edit";
import { useAuth } from "./Components/AppBar/Account";
import AdminLayout from "./view/admin/AdminAppBar";
import ManageProvinces from "./view/admin/ManagerProvince";
import EditProvincePage from "./view/admin/ManagerProvince/edit";
import CreateProvince from "./view/admin/ManagerProvince/create";
const AdminRouter = () => {
  const { isAdminAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Route mặc định cho admin */}
      <Route
        path="/"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/create-province"
        element={
          <AdminLayout>
            <CreateProvince/>
          </AdminLayout>
        } 
      />
      <Route
        path="/provinces"
        element={
          <AdminLayout>
            <ManageProvinces />
          </AdminLayout>
        }
      />
      <Route
        path="/edit-province/:id"
        element={
          <AdminLayout>
            <EditProvincePage />
          </AdminLayout>
        }

      />
      {/* Route khác */}
      <Route
        path="/flights"
        element={
          <AdminLayout>
            <ManageFlights />
          </AdminLayout>
        }
      />
       <Route
        path="/edit-flight/:id"
        element={
          <AdminLayout>
            <EditFlight />
          </AdminLayout>
        }
      />
      
       <Route
        path="/create-flight"
        element={
          <AdminLayout>
          </AdminLayout>
        }
      />


      {/* Redirect khi truy cập không hợp lệ */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default AdminRouter;
