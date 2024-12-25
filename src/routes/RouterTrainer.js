import { lazy } from "react";
import { Navigate } from "react-router-dom";

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
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));
const UserDetails = lazy(() => import("../views/Trainer/UserDetailPage.js"));

/*****Routes******/

const TrainerRoutes = [
  { 
    path: "/",
    element: <FullLayoutTrainer />,
    children: [
      { path: "/", element: <Navigate to="/trainer/all-users" /> },
      
      { path: "/trainer/all-users", element: <AllUser /> },
      { path: "/trainer/assigned-users", element: <AssignedUsers /> },
      { path: "/trainer/assign-workout-plan", element: <AssignWorkoutPlan /> },
      {path:"/trainer/user-information/:clientId" , element:<UserDetails/>},

    ],
  },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
];

export default TrainerRoutes;
