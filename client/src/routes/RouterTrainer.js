import React from "react";
import {  Navigate } from "react-router-dom"; // Ensure Navigate is imported
import PrivateRoute from './PrivateRoute';
import { lazy } from 'react';

// Rest of the code...

/****Layouts*****/
const FullLayoutTrainer = lazy(() => import("../layouts/FullLayout/FullLayoutTrainer.js"));
/****End Layouts*****/

/*****Pages******/
const AllUser = lazy(() => import("../views/Trainer/AllUser.js"));
const AssignedUsers=lazy(() => import("../views/Trainer/Clients.js"));
// const SignIn = lazy(() => import("../components/Auth/SignIn.js"));
const SignUp = lazy(() => import("../components/Auth/SignUp.js"));

const SignIn = lazy(() => import("../components/Auth/SignIn.js"));
const AssignWorkoutPlan=lazy(() => import("../views/Trainer/AssignWorkoutPlan.js"));

// form layouts
const UserDetails = lazy(() => import("../views/Trainer/UserDetailPage.js"));
const AddClientData = lazy(() => import("../views/Trainer/AddClientData.js"));
const Payments = lazy(() => import("../views/Trainer/Payments.js"));
const PaymentStatus = lazy(() => import("../views/Trainer/PaymentStatus.js"));


const Account = lazy(() => import("../views/Trainer/TrainerAccount.js"));

/*****Routes******/


const TrainerRoutes = [
  { 
    path: "/",
    element: <Navigate to="/login" />, // Redirect to login if accessed directly
  },
  { 
    path: "/trainer",
    element: (
      <PrivateRoute allowedRole="Trainer">
        <FullLayoutTrainer />
      </PrivateRoute>
    ),
    children: [
      { path: "/trainer/all-users", element: <AllUser /> },
      { path: "/trainer/assigned-users", element: <AssignedUsers /> },
      { path: "/trainer/assign-workout-plan/:clientId", element: <AssignWorkoutPlan /> },
      { path: "/trainer/user-information/:clientId", element: <UserDetails /> },
      { path: "/trainer/add-client-data/:clientId", element: <AddClientData  /> },
      { path: "/trainer/payments", element: <Payments  /> },
      { path: "/trainer/account", element: <Account  /> },
      { path: "/trainer/client-payment-information/:clientId", element: <PaymentStatus  /> },



      

    ],
  },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
];
export default TrainerRoutes;
