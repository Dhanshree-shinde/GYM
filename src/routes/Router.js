import React from "react";
import {  Navigate } from "react-router-dom"; // Ensure Navigate is imported
import PrivateRoute from './PrivateRoute';
import { lazy } from 'react';
import AddClientData from "../views/Trainer/AddClientData.js";

// Rest of the code...

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

const ExAccount = lazy(() => import("../views/Accounts/Account.js"));

const WorkoutPlan = lazy(() => import("../views/WorkoutPlan/WorkoutPlan.js"));

const PaymentPage = lazy(() => import("../views/Payment/PaymentPage.js"));

const SaveCardInfoPage = lazy(() => import("../views/Payment/SaveCardInfoPage.js"));
const Notification = lazy(() => import("../views/Notification/Notification.js"));



// const SignIn = lazy(() => import("../components/Auth/SignIn.js"));
const SignUp = lazy(() => import("../components/Auth/SignUp.js"));

const SignIn = lazy(() => import("../components/Auth/SignIn.js"));



/*****Routes******/


const ThemeRoutes = [
  { 
    path: "/",
    element: <Navigate to="/login" />, // Redirect to login if accessed directly
  },
  { 
    path: "/client",
    element: (
      <PrivateRoute allowedRole="client">
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/client/dashboards/dashboard1", element: <Dashboard1 /> },
      { path: "/client/accounts/account", element: <ExAccount /> },
      // { path: "/client/accounts/accountProfile", element: <Account /> },
      { path: "/client/workout/workoutplan", element: <WorkoutPlan /> },
      { path: "/client/payment/pay", element: <PaymentPage /> },
      { path: "/client/save-card-info", element: <SaveCardInfoPage /> },

      { path: "/client/notification", element: <Notification /> },

    ],
  },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
];



export default ThemeRoutes;
