import React from "react";
import Box from "@mui/material/Box";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import LoginPage from "../pages/LoginPage";
import User from "../pages/User";
import Testimonials from "../pages/Testimonials";
import Blogs from "../pages/Blogs";
import Courses from "../pages/Courses";
import LiveClass from '../pages/LiveClass';
import Orders from "../pages/Orders";
import Partners from "../pages/Partners"
import AppSettings from "../pages/AppSettings";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NewAppBar from "../components/AppBar";
import Category from "../pages/Category";
import DealsAndOffers from "../pages/DealsAndOffers";
import Banners from "../pages/Banners";
import Faq from "../pages/Faq";
import DemoClass from "../pages/DemoClass";
import Goal from "../pages/Goal";
import Role from "../pages/Role";
import Plan from "../pages/Plan";
let payload={
    meetingNumber:83239512815,
    role:0,
    sdkKey:'aSOXgI9FTUSoflM9Pes_fA',
    sdkSecret:'Wu096EHhpIP0Cfy0so88ea39FrHeSOwb',
    password:'',
    userName:'testing',
    userEmail:'',
    leaveUrl:'https://localhost:3000'
}

function Routers() {
    return (
        <div style={{ height: "100vh" }}>
            <Box sx={{ width: "100%" }}>
                <Routes>
                    <Route exect path="/" element={<ProtectedRoute />}>
                        <Route element={<NewAppBar />}>
                            <Route path="/" element={<Navigate replace to="/dashboard" />} />
                            <Route path="/dashboard" element={<DashBoard />} />
                            <Route path="/users" element={<User />} />
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/testimonials" element={<Testimonials />} />
                            <Route
  path="/liveclass"
  render={(props) => <LiveClass {...props} payload={payload} />}
/>

                            {/* <Route path="/liveclass" element={<LiveClass />} /> */}
                            <Route path="/settings" element={<AppSettings />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/tutors" element={<Partners />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/dealsAndOffers" element={<DealsAndOffers />} />
                            <Route path="/banner" element={<Banners />} />
                            <Route path="/faq" element={<Faq />} />
                            <Route path="/role" element={<Role />} />
                            <Route path="/plan" element={<Plan />} />
                            <Route path="/demo" element={<DemoClass />} />
                            <Route path="/goal" element={<Goal />} />
                        </Route>
                    </Route>
                    <Route exect path="/" element={<PublicRoute />}>
                        <Route path="/" element={<Navigate replace to="/loginPage" />} />
                        <Route path="/loginPage" element={<LoginPage />} />
                    </Route>
                </Routes>
            </Box>
        </div>
    );
}

export default Routers;

