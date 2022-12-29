import { createBrowserRouter } from "react-router-dom";
import AddTask from "./Pages.js/AddTask";
import CompleatedTask from "./Pages.js/CompleatedTask";
import Login from "./Pages.js/Login";

import Main from "./Pages.js/Main";
import MyTask from "./Pages.js/MyTask";
import PrivateRoute from "./Pages.js/PrivateRoute/PrivateRoute";
import SignIn from "./Pages.js/SignIn";

const router = createBrowserRouter([

    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path:'/mytask',
                element:<PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path:'/compleatedtask',
                element:<PrivateRoute><CompleatedTask></CompleatedTask></PrivateRoute>
            },
            {
                path:'/signup',
                element:<SignIn></SignIn>
            },
            {
                path:'/login',
                element:<Login></Login>
            }

        ]
    },
    {}
])
export default router;