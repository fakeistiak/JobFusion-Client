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
        element:<AppliedJobs/>
      },
      {
        path:"/blog",
        element:<Blog/>
      },
      {
        path:"/job/:id",
        element:<JobDetails/>,
        loader:()=>fetch('../jobs.json')
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
