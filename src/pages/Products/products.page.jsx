import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProducts,
  updateDonateDetails,
} from "../../services/product.services";
import { getUserInfo, updateSAMoneyStatus } from "../../services/user.services";
import { UserInfoContext } from "../../context/userInfo.context";
import { ToastContainer, toast } from "react-toastify";
import "./products.css";
import { postDonationTweet } from "../../services/twitter.services";

export const ProductsPage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { Campaign, Source } = location.state;
  console.log(userInfo);

  const [productsData, setProductsData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [key, setKey] = useState(null);
  const [scaleImg, setScaleImg] = useState(false);
  const [quantity, setQuantity] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({});

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const notify_seccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notify_error = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // const getProductsFromDB = async () => {
  //   let res = await getProducts();
  //   setProductsData(res);
  // };

  const getCampaignProductsFromDB = async () => {
    let res = await getProducts();
    let filteredRes;
    if (Source === "BCCampaigns") {
      filteredRes = res.filter((p) => {
        if (p.Campaign_code === Campaign.Code && p.BC_Email === user.email)
          return p;
      });
    } else {
      filteredRes = res.filter((p) => {
        if (p.Campaign_code === Campaign.Code) return p;
      });
    }
    setProductsData(filteredRes);
  };

  useEffect(() => {
    getCampaignProductsFromDB();
  }, [Source]);

  const handleImg = (proKey) => {
    setScaleImg(!scaleImg);
    setKey(proKey);
  };

  const handleClick = (proKey) => {
    setExpanded(!expanded);
    setKey(proKey);
    if (!expanded)
      setQuantity((prevQuantity) => ({ ...prevQuantity, [proKey]: 0 }));
  };

  const handleUpadate = (Campaign, Product) => {
    navigate("/add-campaign-product", {
      state: {
        Campaign,
        Product,
      },
    });
  };

  const handleQuantity = (code, value) => {
    setQuantity((prevQuantity) => ({ ...prevQuantity, [code]: value }));
  };

  const handleModalOpen = (product) => {
    setProductData(product);
    setShowModal(true);
  };

  const handleModalApprove = async (product, quantity, price) => {
    if (price > userInfo.Money_Status) {
      notify_error(
        "You need to collect more money to donate in the corrent price!"
      );
    } else {
      const updatedSAMoney = userInfo.Money_Status - price;
      const newOrder = {
        SACode: userInfo.Code,
        BCCode: product.BC_code,
        CampaignCode: Campaign.Code,
        ProductCode: product.Code,
      };
      const donationTweetDetails = {
        TwitterName: userInfo.Tweeter_Name,
        Quantity: quantity,
        ProductName: product.Name,
        CampaignName: Campaign.Name,
        CampaignHashTag: Campaign.HashTag,
      };
      await updateDonateDetails(newOrder, quantity);
      await updateSAMoneyStatus(updatedSAMoney, userInfo.Code);
      await postDonationTweet(donationTweetDetails);
      notify_seccess("We Thank you for your kind donation to " + Campaign.Name);
      await sleep(3000);
      let userInfoArray = await getUserInfo(user.email, "SA");
      setUserInfo(userInfoArray[0]);
      getCampaignProductsFromDB();
      setShowModal(false);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="ProductsPage--my-tbl my-tbl">
      <h1>{Campaign.Name}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Units In Stock</th>
            <th scope="col">Sponsers</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productsData &&
            productsData.map((product) => {
              return (
                <>
                  <tr>
                    <td onClick={() => handleImg(product.Code)}>
                      {scaleImg && product.Code === key && (
                        <img
                          src={product.Image}
                          alt=""
                          className={"td-img td-img-big"}
                        />
                      )}
                      {!scaleImg && (
                        <img src={product.Image} alt="" className={"td-img"} />
                      )}
                    </td>
                    <td>{product.Name}</td>
                    <td>{product.Price}$</td>
                    <td>
                      {product.Units_In_Stock === 0
                        ? "Out Of Stock"
                        : product.Units_In_Stock}
                    </td>
                    <td>{product.BC_Name}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleClick(product.Code)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                  {expanded && product.Code === key ? (
                    <tr className="expanded">
                      {Source === "navbar" && (
                        <td colSpan={6} className="expanded">
                          <h5>{product.ProductName} Description : </h5>
                          {product.Description}
                        </td>
                      )}
                      {Source === "NPOCampaigns" && (
                        <td colSpan={6} className="expanded">
                          <h5>{product.ProductName} Description : </h5>
                          {product.Description}
                        </td>
                      )}
                      {Source === "BCCampaigns" && (
                        <>
                          <td colSpan={5} className="expanded">
                            <h5>{product.ProductName} Description : </h5>
                            {product.Description}
                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                handleUpadate(Campaign, product);
                              }}
                            >
                              Edit Product
                            </button>
                          </td>
                        </>
                      )}
                      {Source === "SACampaigns" && (
                        <>
                          <td colSpan={3} className="expanded">
                            <h5>{product.ProductName} Description : </h5>
                            {product.Description}
                          </td>
                          <td>
                            Quantity
                            <br />
                            <input
                              type="number"
                              min={0}
                              max={product.Units_In_Stock}
                              onChange={(e) =>
                                handleQuantity(product.Code, e.target.value)
                              }
                            />
                          </td>
                          <td>
                            Total Price:
                            <br />
                            {(product.Price * quantity[product.Code]).toFixed(
                              2
                            )}
                            $
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleModalOpen(product)}
                            >
                              Donate
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ) : null}
                </>
              );
            })}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Approve your Donation</h2>
            <h4>Donation details:</h4>
            <p>Product name: {productData.Name}</p>
            <p>Quantity: {quantity[productData.Code]}</p>
            <p>
              Total Price:{" "}
              {(productData.Price * quantity[productData.Code]).toFixed(2)}$
            </p>
            <br />
            <p>To approve your Donation click on the button bellow</p>
            <div className="modal-btn">
              {quantity[productData.Code] !== "0" &&
                quantity[productData.Code] !== 0 && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        handleModalApprove(
                          productData,
                          parseInt(quantity[productData.Code]),
                          parseFloat(
                            productData.Price * quantity[productData.Code]
                          )
                        )
                      }
                    >
                      Approve
                      <ToastContainer />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleModalCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
              {(quantity[productData.Code] === "0" ||
                quantity[productData.Code] === 0) && (
                <>
                  <button
                    className="btn btn-danger"
                    onClick={handleModalCancel}
                  >
                    Fill Quantity
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
