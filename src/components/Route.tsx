import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectedRoute from "./ProtecetdRoute";
import Dashboard from "../pages/dashboard";
import TicketList from "../pages/ticketList";
import TicketDetailsDialog from "../pages/TicketPopUp";
import NewTicketPage from "../pages/newTicket";
import Role from "./Role";
import Status from "../pages/Status";
import AppProvider from "../Providers/AppProvider";
import Users from "../pages/Users";
import Notfound from "../pages/notFounnd";

export const route=createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:
        [
            {
                path:"/login",
                element:<Login  />
            },
            {
                path:"/register",
                element:<Register />
            },
            {
                path:"/dashboard",
                element:<ProtectedRoute><Dashboard /></ProtectedRoute>
            }
            ,{
                path:"/ticket",
                element:<ProtectedRoute><TicketList /></ProtectedRoute>
            },
            {
                path:"/ticket/:id",
                element:<ProtectedRoute><TicketDetailsDialog  /></ProtectedRoute>
            },
            {
                path:"/ticket/new",
                element:<Role roles={["customer"]}><ProtectedRoute><NewTicketPage /></ProtectedRoute></Role>
            },
            {
                path:"/status",
                element:<Role roles={["admin"]}><ProtectedRoute><Status /></ProtectedRoute></Role>
            },
             {
                path:"/users",
                element:<Role roles={["admin"]}><ProtectedRoute><Users /></ProtectedRoute></Role>
            },
            {
                path:"*",
                element:<Notfound />
            }


        ]
    }
])
export default route;