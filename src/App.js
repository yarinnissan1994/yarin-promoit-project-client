import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { RoleContext } from "./context/role.context";
import { CampaignsSourceContext } from "./context/campaignsSource.context";
import { UserInfoContext } from "./context/userInfo.context";
import {
  NavbarComponent,
  StatusbarComponent,
  RegisterationFormComponent,
  UserManagerComponent,
  CreateCampaignComponent,
  AddCanpaginProductComponent,
  OrderManagerComponent,
  MyDonationsComponent,
} from "./components/index";
import {
  HomePage,
  AllCampaignsPage,
  AboutUsPage,
  ContactUsPage,
  RegistarationPage,
  CampaignPage,
  ProductsPage,
  ReportsPage,
} from "./pages/index";
import { HashLoader } from "react-spinners";
import { ProfilePage } from "./pages/Profile/profile.page";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [role, setRole] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [source, setSource] = useState("");
  if (!isLoading) {
    if (isAuthenticated) {
      return (
        <RoleContext.Provider value={{ role, setRole }}>
          <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            <CampaignsSourceContext.Provider value={{ source, setSource }}>
              <div className="App">
                <div className="navbar-container">
                  <NavbarComponent />
                </div>
                <div className="middle-layer">
                  <div className="status-bar-container">
                    <StatusbarComponent />
                  </div>
                  <div className="routes-container">
                    <Routes>
                      <Route path="/" element={<HomePage />}></Route>
                      <Route path="/about-us" element={<AboutUsPage />}></Route>
                      <Route
                        path="/contact-us"
                        element={<ContactUsPage />}
                      ></Route>
                      <Route
                        path="/register"
                        element={<RegistarationPage />}
                      ></Route>
                      <Route
                        path="/registerarion-form"
                        element={<RegisterationFormComponent />}
                      ></Route>
                      <Route
                        path="/user-manager"
                        element={<UserManagerComponent />}
                      ></Route>
                      <Route
                        path="/all-campaigns"
                        element={<AllCampaignsPage />}
                      ></Route>
                      <Route
                        path="/new-campaign"
                        element={<CreateCampaignComponent />}
                      ></Route>
                      <Route
                        path="/campaign"
                        element={<CampaignPage />}
                      ></Route>
                      <Route
                        path="/add-campaign-product"
                        element={<AddCanpaginProductComponent />}
                      ></Route>
                      <Route
                        path="/products"
                        element={<ProductsPage />}
                      ></Route>
                      <Route
                        path="/order-manager"
                        element={<OrderManagerComponent />}
                      ></Route>
                      <Route path="/reports" element={<ReportsPage />}></Route>
                      <Route
                        path="/my-donations"
                        element={<MyDonationsComponent />}
                      ></Route>
                      <Route path="/profile" element={<ProfilePage />}></Route>
                    </Routes>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </CampaignsSourceContext.Provider>
          </UserInfoContext.Provider>
        </RoleContext.Provider>
      );
    } else {
      return (
        <CampaignsSourceContext.Provider value={{ source, setSource }}>
          <div className="App">
            <NavbarComponent />
            <br />
            <br />
            <div className="middle-layer">
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route
                  path="/all-campaigns"
                  element={<AllCampaignsPage />}
                ></Route>
                <Route path="/campaign" element={<CampaignPage />}></Route>
                <Route path="/about-us" element={<AboutUsPage />}></Route>
                <Route path="/contact-us" element={<ContactUsPage />}></Route>
                <Route path="/products" element={<ProductsPage />}></Route>
              </Routes>
            </div>
            <br />
            <br />
          </div>
        </CampaignsSourceContext.Provider>
      );
    }
  } else {
    return (
      <div className="App">
        <h1 className="spinner">
          <HashLoader color="#36d7b7" />
        </h1>
      </div>
    );
  }
}

export default App;
