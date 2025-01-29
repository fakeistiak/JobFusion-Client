import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import Home from './Pages/Home/Home.jsx';
import Statistics from './Pages/Statistics/Statistics';
import AppliedJobs from './Pages/AppliedJobs/AppliedJobs';
import Blog from './Pages/Blog/Blog';
import JobDetails from './Pages/Home/FeaturedJobs/JobDetails';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AuthProvider from './Provider/AuthProvider';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/statistics",
        element:<Statistics/>
      },
      {
        path:"/applied",
        element:<PrivateRoute><AppliedJobs/></PrivateRoute>,
        loader:()=>fetch('../jobs.json')
      },
      {
        path:"/blog",
        element:<Blog/>
      },
      {
        path:"/job/:id",
        element:<JobDetails/>,
        loader:()=>fetch('/jobs.json')
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
