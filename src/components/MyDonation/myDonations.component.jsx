import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../context/userInfo.context";
import { getMyDonations } from "../../services/services";

export const MyDonationsComponent = () => {
  const [myDonationsList, setMyDonations] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const { userInfo } = useContext(UserInfoContext);

  const getMyDonationsFromDB = async () => {
    let res = await getMyDonations(userInfo.Code);
    let sum;
    sum = res.reduce((acc, donation) => acc + donation.Total_Price, 0);
    setTotalPrice(sum);
    sum = res.reduce((acc, donation) => acc + donation.Donation_Count, 0);
    setTotalProducts(sum);
    setMyDonations(res);
  };

  useEffect(() => {
    getMyDonationsFromDB();
  }, []);

  return (
    <div className="UserManager--my-tbl my-tbl">
      <h1>Hi {userInfo.Name},</h1>
      <h5>
        Amount of money you donated: <b>{totalPrice}</b>
      </h5>
      <h5>
        Number of products you donated: <b>{totalProducts}</b>
      </h5>
      <h3>Watch all your donations history:</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Donated</th>
            <th scope="col">Price</th>
            <th scope="col">Total Donated</th>
            <th scope="col">Donated To</th>
          </tr>
        </thead>
        <tbody>
          {myDonationsList &&
            myDonationsList.map((Donation) => {
              return (
                <tr>
                  <td>{Donation.Product_Name}</td>
                  <td>{Donation.Donation_Count} times</td>
                  <td>{Donation.Price}$</td>
                  <td>{Donation.Total_Price}$</td>
                  <td>{Donation.Campaign_Name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
