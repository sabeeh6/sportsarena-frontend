import { LayoutDashboard, MapPin } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";


export const UserPanel = ()=>{
    const UserNavItems = [
        {id:'dashboard' , path:"/user/dashboard" , icon:LayoutDashboard , label:"Dashboard"},
        {id:'grounds' , path:"/user/ground" , icon:MapPin , label:"Grounds"},
    ] 

    return(<>
        <DashboardLayout 
            panelTitle="User Panel"
            navItems={UserNavItems}
            logoutRedirect="/login"
         />
    </>)
}
