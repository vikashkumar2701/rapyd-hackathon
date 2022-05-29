import React, { useEffect, useState } from "react";
import "./Success.css";
import Cookies from "js-cookie";
var axios = require("axios");

export default function Success() {
  var [Resp, setResp] = useState({
    id: "",
    metadata: { address: {}, orders: {} }
  });

  async function fetchData() {
    var config = {
      method: "get",
      url:
        "https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/checkout/" +
        Cookies.get("checkout_id"),
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios(config)
      .then(function (response) {
        setResp(response.data.body.data.payment);
        console.log(response.data.body.data.payment);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="parent" id="container">
        <div className="success-header">
          <img src="https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif" />
        </div>
        <div className="success-body">Payment Successful</div>
        <div className="order-details">
          <table>
            <tr>
              <td>Payment ID</td>

              <td>{Resp.length == 0 ? " " : Resp.id}</td>
            </tr>
            <tr>
              <td>Amount</td>

              <td>{Resp.amount}</td>
            </tr>
            <tr>
              <td>Address</td>

              <td>
                {" "}
                {Resp.metadata.address.billing_address_line_1},{" "}
                {Resp.metadata.address.billing_address_line_2},{" "}
                {Resp.metadata.address.billing_city},{" "}
                {Resp.metadata.address.billing_state}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
