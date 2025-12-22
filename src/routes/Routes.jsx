import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Statistics from "../pages/Dashboard/Common/Statistics";
import CreateRequest from "../pages/Dashboard/Common/CreateRequest";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Dashboard/Common/Profile";
import AllBloodRequests from "../pages/Dashboard/Common/AllBloodRequests";
import Funding from "../pages/Dashboard/Common/Funding";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import SearchDonors from "../pages/SearchDonors/SearchDonors";
import BloodRequestsDetails from "../components/BloodRequests/BloodRequestsDetails";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import MyBloodRequests from "../pages/Dashboard/Donor/MyBloodRequests";
import { locationLoader } from "../loaders/locationLoader";
import GiveFund from "../pages/GiveFund/GiveFund";
import RoleRoute from "./RoleRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests />,
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <BloodRequestsDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/give-fund",
        element: (
          <PrivateRoute>
            <GiveFund />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success/",
        element: <PaymentSuccess />,
      },
      {
        path: "/search-donors",
        element: <SearchDonors />,
        loader: locationLoader,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", loader: locationLoader, element: <SignUp /> },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            {" "}
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/create-request",
        element: <CreateRequest />,
        loader: locationLoader,
      },
      {
        path: "/dashboard/all-blood-requests",
        element: (
          <RoleRoute allowedRoles={["admin", "volunteer"]}>
            <AllBloodRequests />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/my-blood-requests",
        element: <MyBloodRequests />,
      },
      {
        path: "/dashboard/funding",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <Funding />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
        loader: locationLoader,
      },
    ],
  },
]);
