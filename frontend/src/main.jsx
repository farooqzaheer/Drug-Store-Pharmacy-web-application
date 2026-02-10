import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DisplayDrags from "./components/Drags/DisplayDrags.jsx";
import DisplayDoctors from "./components/Doctors/DisplayDoctors.jsx";
import DisplayDoctorDrags from "./components/DoctorDrag/DisplayDrD.jsx";
import DisplayDoctorPayment from "./components/DoctorPayment/DisplayDoctorPayment.jsx";
import DragRegister from "./components/Drags/RegisterDrag.jsx";
import RegisterDoctor from "./components/Doctors/RegisterDoctor.jsx";
import "./components/Layout/fonts.css";
import DisplayCategory from "./components/Category/DisplayCategory.jsx";
import RegisterCategory from "./components/Category/AdCategory.jsx";
import AdDoctorPayment from "./components/DoctorPayment/PayingDoctor.jsx";
import AdDrDrag from "./components/DoctorDrag/AdDrDrag.jsx";
import "./components/Localization/localization";
import DoctorDetailBell from "./components/Doctors/DoctorDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "page not Font",

    children: [
      {
        path: "/",
        element: <DisplayDrags />,
      },
      {
        path: "/doctors/",
        element: <DisplayDoctors />,
      },
      {
        path: "/doctor/drag/",
        element: <DisplayDoctorDrags />,
      },
      {
        path: "/doctor/payment/",
        element: <DisplayDoctorPayment />,
      },
      {
        path: "/register/drag/",
        element: <DragRegister />,
      },
      {
        path: "/register/doctor/",
        element: <RegisterDoctor />,
      },
      {
        path: "doctor/drag/buying/",
        element: <AdDrDrag />,
      },
      {
        path: "/categories/",
        element: <DisplayCategory />,
      },
      {
        path: "/register/category/",
        element: <RegisterCategory />,
      },
      {
        path: "/ad/payment/doctor/",
        element: <AdDoctorPayment />,
      },
      {
        path: "/doctor/detail/:id/",
        element: <DoctorDetailBell />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {},
});

ReactDOM.createRoot(document.getElementById("app")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
