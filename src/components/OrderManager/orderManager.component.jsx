import React, { useEffect, useState } from "react";
import { approveOrderShipped, getOrders } from "../../services/services";
import "./orderManager.css";

export const OrderManagerComponent = () => {
  const [orderList, setOrderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [time, setTime] = useState("");

  const getUserDataFromDB = async () => {
    let res = await getOrders();
    setOrderList(res);
  };

  useEffect(() => {
    getUserDataFromDB();
  }, []);

  const handleTimeFormat = (time) => {
    const date = new Date(time);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Jerusalem",
      hour12: false,
    };
    const israeliFormat = new Intl.DateTimeFormat("he-IL", options).format(
      date
    );
    setTime(israeliFormat);
  };

  const handleModalOpen = (orderData) => {
    setOrderDetails(orderData);
    handleTimeFormat(orderData.Order_Time);
    setShowModal(true);
  };

  const handleModalShipped = async (orderCode) => {
    await approveOrderShipped(orderCode);
    await getUserDataFromDB();
    setShowModal(false);
  };

  const handleModalReturn = () => {
    setShowModal(false);
  };

  return (
    <div className="OrderManager--my-tbl my-tbl">
      <h1>Order Manager</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Order Number</th>
            <th scope="col">Activist Name</th>
            <th scope="col">Product</th>
            <th scope="col">Campaign</th>
            <th scope="col">Delivered</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orderList &&
            orderList.map((order) => {
              return (
                <tr>
                  <th scope="row">{order.Code}</th>
                  <td>{order.SA_Name}</td>
                  <td>{order.Product_Name}</td>
                  <td>{order.Campaign_Name}</td>
                  <td>{order.is_Sent ? "✔" : "❌"}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleModalOpen(order)}
                    >
                      Order Details
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Orders Details</h2>
            <p>
              <b>Adress:</b> {orderDetails.Activist_Address}
            </p>
            <p>
              <b>Phone Number:</b> {orderDetails.Activist_Phone}
            </p>
            <p>
              <b>Activist Email:</b> {orderDetails.Activist_Email}
            </p>
            <p>
              <b>Campaign Email:</b> {orderDetails.Campaign_Email}
            </p>
            <p>
              <b>Order Time:</b> {time}
            </p>
            <div className="codes">
              <div>
                <h6>Activist Code:</h6> {orderDetails.SA_code}
              </div>
              <div>
                <h6>Campaign Code:</h6> {orderDetails.Campaign_code}
              </div>
              <div>
                <h6>Company Code:</h6> {orderDetails.BC_code}
              </div>
              <div>
                <h6>Product Code:</h6> {orderDetails.Product_code}
              </div>
            </div>
            <br />
            <div className="modal-btn">
              {!orderDetails.is_Sent && (
                <button
                  className="btn btn-success"
                  onClick={() => handleModalShipped(orderDetails.Code)}
                >
                  Shipped
                </button>
              )}
              <button className="btn btn-danger" onClick={handleModalReturn}>
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
