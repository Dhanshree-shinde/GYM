import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

const Account = lazy(() => import("../views/Accounts/AccountProfile.js"));
const ExAccount = lazy(() => import("../views/Accounts/Account.js"));

const WorkoutPlan = lazy(() => import("../views/WorkoutPlan/WorkoutPlan.js"));

const PaymentPage = lazy(() => import("../views/Payment/PaymentPage.js"));

const SaveCardInfoPage = lazy(() => import("../views/Payment/SaveCardInfoPage.js"));



// const SignIn = lazy(() => import("../components/Auth/SignIn.js"));
const SignUp = lazy(() => import("../components/Auth/SignUp.js"));

const SignIn = lazy(() => import("../components/Auth/SignIn.js"));


/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));

// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

const ThemeRoutes = [
  { 
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      // { path: "tables/basic-table", element: <BasicTable /> },
      // { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      // { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      // { path: "/form-elements/button", element: <ExButton /> },
      // { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      // { path: "/form-elements/radio", element: <ExRadio /> },
      // { path: "/form-elements/slider", element: <ExSlider /> },
      // { path: "/form-elements/switch", element: <ExSwitch /> },
      { path: "/accounts/account", element: <ExAccount /> },
      { path: "/accounts/accountProfile", element: <Account /> },
      { path: "/workout/workoutplan", element: <WorkoutPlan /> },
      { path: "/payment/pay", element: <PaymentPage /> },
      { path: "/save-card-info", element: <SaveCardInfoPage /> },
      


    ],
  },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
];

export default ThemeRoutes;
