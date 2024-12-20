import React, { useState } from "react";

const SaveCardInfoPage = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cvv: "",
    expiry: "",
    nameOnCard: "",
    billingAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveInfo = () => {
    console.log("Card Info Saved:", cardInfo);
    alert("Integrate Stripe or PayPal API here.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Save Card Information</h1>
      <div>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Expiry:
          <input
            type="month"
            name="expiry"
            value={cardInfo.expiry}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Name on Card:
          <input
            type="text"
            name="nameOnCard"
            value={cardInfo.nameOnCard}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Billing Address:
          <input
            type="text"
            name="billingAddress"
            value={cardInfo.billingAddress}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={handleSaveInfo}>Save Info</button>
    </div>
  );
};

export default SaveCardInfoPage;
