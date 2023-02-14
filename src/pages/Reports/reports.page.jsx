import React, { useEffect, useState } from "react";
import { getOwnerReport } from "../../services/reports.services";
import "./reports.css";

export const ReportsPage = () => {
  const [type, setType] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [reportData, setReportData] = useState([]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const getReportFromDB = async () => {
    let res;
    if (type === "users" && filter === "NPO")
      res = await getOwnerReport(filter);
    else if (type === "users" && filter === "BC")
      res = await getOwnerReport(filter);
    else if (type === "users" && filter === "SA")
      res = await getOwnerReport(filter);
    else if (type === "campaigns") res = await getOwnerReport(type);
    else if (type === "tweeter") res = await getOwnerReport(type);

    if (sort === "code") {
      res.sort((a, b) => a.Code - b.Code);
    } else if (sort === "name") {
      res.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sort === "email") {
      res.sort((a, b) => a.Email.localeCompare(b.Email));
    } else if (sort === "donations") {
      res.sort((a, b) => b.Donations - a.Donations);
    } else if (sort === "money") {
      res.sort((a, b) => b.Money_Status - a.Money_Status);
    } else if (sort === "tweets") {
      res.sort((a, b) => b.Social_Activity - a.Social_Activity);
    } else if (sort === "products") {
      res.sort((a, b) => b.Products - a.Products);
    } else if (sort === "campaigns") {
      res.sort((a, b) => b.Products - a.Products);
    }
    // Add more sorting conditions for the other options here

    // Filter the res array
    if (searchInput !== "") {
      res = res.filter((item) =>
        item.Name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setReportData(res);
  };

  useEffect(() => {
    getReportFromDB();
  }, [type, filter, sort, searchInput]);

  return (
    <div className="ReportsPage--report-container">
      <h1>Report Generator</h1>
      <div className="filter-container">
        <label>Report Type:</label>
        <select value={type} onChange={handleTypeChange}>
          <option value=""></option>
          <option value="users">Users</option>
          <option value="campaigns">Campaigns</option>
          <option value="tweeter">Tweeter</option>
        </select>
        {type === "users" && (
          <>
            <label>Filter By:</label>
            <select value={filter} onChange={handleFilterChange}>
              <option value=""></option>
              <option value="NPO">Non Profit Organization</option>
              <option value="BC">Buisness Company</option>
              <option value="SA">Social Activist</option>
            </select>
          </>
        )}
        <label>Sort By:</label>
        <select value={sort} onChange={handleSortChange}>
          <option value=""></option>
          <option value="code">Code</option>
          <option value="name">User Name</option>
          <option value="email">Email</option>
          {type === "campaigns" && (
            <>
              <option value="donations">Donations</option>
            </>
          )}
          {type === "users" && filter === "SA" && (
            <>
              <option value="money">Money Status</option>
              <option value="tweets">Social Activity</option>
            </>
          )}
          {type === "users" && filter === "NPO" && (
            <>
              <option value="campaigns">Campaigns</option>
              <option value="donations">Donations</option>
            </>
          )}
          {type === "users" && (filter === "NPO" || filter === "BC") && (
            <>
              <option value="products">Products</option>
            </>
          )}
          {type === "users" && filter === "BC" && (
            <>
              <option value="donations">Orders</option>
            </>
          )}
        </select>
        <div className="search-bar">
          <label>Search by name:</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      {type === "users" && filter === "NPO" ? (
        <div className="table--all">
          <h2 className="table--title">Non Profit Organizations</h2>
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Website</th>
                <th scope="col">Campaigns</th>
                <th scope="col">Products</th>
                <th scope="col">Donations</th>
              </tr>
            </thead>
            <tbody>
              {reportData &&
                reportData.map((row) => {
                  return (
                    <>
                      <tr>
                        <td>{row.Code}</td>
                        <td>{row.Name}</td>
                        <td>{row.Email}</td>
                        <td>{row.Website_URL}</td>
                        <td>{row.Campaigns}</td>
                        <td>{row.Products}</td>
                        <td>{row.Donations}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : null}
      {type === "users" && filter === "BC" ? (
        <div className="table--all">
          <h2 className="table--title">Buisness Companies</h2>
          <br />
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Products</th>
                <th scope="col">Orders</th>
              </tr>
            </thead>
            <tbody>
              {reportData &&
                reportData.map((row) => {
                  return (
                    <>
                      <tr>
                        <td>{row.Code}</td>
                        <td>{row.Name}</td>
                        <td>{row.Email}</td>
                        <td>{row.Products}</td>
                        <td>{row.Donations}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : null}
      {type === "users" && filter === "SA" ? (
        <div className="table--all">
          <h2 className="table--title">Social Activists</h2>
          <br />
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Money Status</th>
                <th scope="col">Social Activity</th>
                <th scope="col">Donations</th>
              </tr>
            </thead>
            <tbody>
              {reportData &&
                reportData.map((row) => {
                  return (
                    <>
                      <tr>
                        <td>{row.Code}</td>
                        <td>{row.Name}</td>
                        <td>{row.Email}</td>
                        <td>{row.Address}</td>
                        <td>{row.Phone_Number}</td>
                        <td>{row.Money_Status}$</td>
                        <td>{row.Social_Activity}</td>
                        <td>{row.Donations}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : null}
      {type === "campaigns" ? (
        <div className="table--all">
          <h2 className="table--title">Campagins</h2>
          <br />
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Landing Page</th>
                <th scope="col">Organizion</th>
                <th scope="col">Social Activity</th>
                <th scope="col">Donations</th>
              </tr>
            </thead>
            <tbody>
              {reportData &&
                reportData.map((row) => {
                  return (
                    <>
                      <tr>
                        <td>{row.Code}</td>
                        <td>{row.Name}</td>
                        <td>{row.Email}</td>
                        <td>{row.Landing_Page_URL}</td>
                        <td>{row.Organization}</td>
                        <td>{row.Social_Activity}</td>
                        <td>{row.Donations}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : null}
      {type === "tweeter" ? (
        <div className="table--all">
          <h2 className="table--title">Tweets Report</h2>
          <br />
          <table className="table  table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Activist Name</th>
                <th scope="col">Activist Email</th>
                <th scope="col">Campaign</th>
                <th scope="col">HashTag</th>
              </tr>
            </thead>
            <tbody>
              {reportData &&
                reportData.map((row) => {
                  return (
                    <>
                      <tr>
                        <td>{row.Code}</td>
                        <td>{row.Name}</td>
                        <td>{row.Email}</td>
                        <td>{row.Campaign}</td>
                        <td>{row.HashTag}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};
