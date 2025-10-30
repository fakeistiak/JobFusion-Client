import Main from "@/Layout/Main";
import Home from "@/Pages/Home/Home";
import Statistics from "@/Pages/Statistics/Statistics";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppliedJobs from "@/Pages/AppliedJobs/AppliedJobs";
import Blog from "@/Pages/Blog/Blog";
import Login from "@/Pages/Login/Login";
import JobDetails from "@/Pages/Home/FeaturedJobs/JobDetails";
import Register from "@/Pages/Register/Register";
import AddJob from "@/Pages/AddJob/AddJob";
import AllJobs from "./AllJobs/AllJobs";
import Profile from "@/Pages/Profile/Profile";
import UserProfile from "@/Pages/Profile/UserProfile";
import JobApply from "@/Pages/JobApply/JobApply";
import AdminDashboard from "@/Pages/AdminDashboard/AdminDashboard";
import JobApplications from "@/Pages/AdminDashboard/JobApplications";
import AllUsers from "@/Pages/AdminDashboard/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/appliedJobs",
        element: (
          <PrivateRoute>
            <AppliedJobs />
          </PrivateRoute>
        ),
        loader: () => fetch("https://job-fusion-server-9yho.vercel.app/jobs"),
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/job/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-fusion-server-9yho.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/addjob",
        element: <AddJob />,
      },
      {
        path: "/alljobs",
        element: (
          <PrivateRoute>
            <AllJobs />
          </PrivateRoute>
        ),
        loader: () => fetch("https://job-fusion-server-9yho.vercel.app/jobs"),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        loader: () => fetch("https://job-fusion-server-9yho.vercel.app/users"),
      },
      {
        path: "/userProfile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
        loader: () => fetch("https://job-fusion-server-9yho.vercel.app/users"),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/addjob",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/allApplications",
        element: (
          <PrivateRoute>
            <JobApplications />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
