import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentCycle, setPaymentCycle] = useState("monthly");
  const [dueDate, setDueDate] = useState("2024-12-31"); // Example due date
  const navigate = useNavigate();

  const handleCompletePayment = () => {
    navigate("/save-card-info");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Payment</h1>
      <div>
        <label>
          Payment Cycle:
          <select
            value={paymentCycle}
            onChange={(e) => setPaymentCycle(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Next Payment Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCompletePayment}>Complete Payment</button>
    </div>
  );
};

export default PaymentPage;
