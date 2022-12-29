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
        element:<PrivateRoute><Main></Main></PrivateRoute>,
        children:[
            {
                path:'/',
                element:<AddTask></AddTask>
            },
            {
                path:'/mytask',
                element:<MyTask></MyTask>
            },
            {
                path:'/compleatedtask',
                element:<CompleatedTask></CompleatedTask>
            },
            

        ]
    },
    {
        
            path:'/signup',
            element:<SignIn></SignIn>
        
    },
    
    {
        path:'/login',
        element:<Login></Login>
    }
])
export default router;