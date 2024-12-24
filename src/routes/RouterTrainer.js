import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayoutTrainer = lazy(() => import("../layouts/FullLayout/FullLayoutTrainer.js"));
/****End Layouts*****/

/*****Pages******/
const AllUser = lazy(() => import("../views/Trainer/AllUser.js"));

// const SignIn = lazy(() => import("../components/Auth/SignIn.js"));
const SignUp = lazy(() => import("../components/Auth/SignUp.js"));

const SignIn = lazy(() => import("../components/Auth/SignIn.js"));


// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

const TrainerRoutes = [
  { 
    path: "/",
    element: <FullLayoutTrainer />,
    children: [
      { path: "/", element: <Navigate to="/trainer/users" /> },
      // { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      // { path: "tables/basic-table", element: <BasicTable /> },
      // { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      // { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      // { path: "/form-elements/button", element: <ExButton /> },
      // { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      // { path: "/form-elements/radio", element: <ExRadio /> },
      // { path: "/form-elements/slider", element: <ExSlider /> },
      // // { path: "/form-elements/switch", element: <ExSwitch /> },
      // { path: "/accounts/account", element: <ExAccount /> },
      // { path: "/accounts/accountProfile", element: <Account /> },
      // { path: "/workout/workoutplan", element: <WorkoutPlan /> },
      // { path: "/payment/pay", element: <PaymentPage /> },
      { path: "/trainer/users", element: <AllUser /> },
      


    ],
  },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
];

export default TrainerRoutes;
