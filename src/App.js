import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavbarComponent } from "./components/NavBar/navbar.component";
import { HomePage } from "./pages/Home/home.page";
import { AllCampaignsPage } from "./pages/AllCampaigns/allCampaigns.page";
import { AboutUsPage } from "./pages/AboutUs/aboutUs.page";
import { ContactUsPage } from "./pages/ContactUs/contactUs.page";
import { StatusbarComponent } from "./components/StatusBar/statusbar.component";
import { useAuth0 } from "@auth0/auth0-react";
import { RoleContext } from "./context/role.context";
import { RegistarationPage } from "./pages/Registeration/registeration.page";
import { RegisterationFormComponent } from "./components/RegisterationForm/registerationForm.component";
import { UserManagerComponent } from "./components/UserManager/userManager.component";
import { CreateCampaignComponent } from "./components/CreateCampaign/createCampaign.component";
import { CampaignPage } from "./pages/CampaignPage/campaign.page";
import { CampaignsSourceContext } from "./context/campaignsSource.context";
import { AddCanpaginProductComponent } from "./components/AddCampaignProduct/addCanpaginProduct.component";
import { ProductsPage } from "./pages/Products/products.page";
import { UserInfoContext } from "./context/userInfo.context";
import { OrderManagerComponent } from "./components/OrderManager/orderManager.component";

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
                <NavbarComponent />
                <div className="middle-layer">
                  <StatusbarComponent />
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
                    <Route path="/campaign" element={<CampaignPage />}></Route>
                    <Route
                      path="/add-campaign-product"
                      element={<AddCanpaginProductComponent />}
                    ></Route>
                    <Route path="/products" element={<ProductsPage />}></Route>
                    <Route
                      path="/order-manager"
                      element={<OrderManagerComponent />}
                    ></Route>
                  </Routes>
                </div>
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
          </div>
        </CampaignsSourceContext.Provider>
      );
    }
  } else {
    return <h1>loading</h1>;
  }
}

export default App;
