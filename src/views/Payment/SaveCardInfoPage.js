// import React, { useState } from "react";

// const SaveCardInfoPage = () => {
//   const [cardInfo, setCardInfo] = useState({
//     cardNumber: "",
//     cvv: "",
//     expiry: "",
//     nameOnCard: "",
//     billingAddress: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCardInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSaveInfo = () => {
//     console.log("Card Info Saved:", cardInfo);
//     alert("Integrate Stripe or PayPal API here.");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Save Card Information</h1>
//       <div>
//         <label>
//           Card Number:
//           <input
//             type="text"
//             name="cardNumber"
//             value={cardInfo.cardNumber}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           CVV:
//           <input
//             type="text"
//             name="cvv"
//             value={cardInfo.cvv}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Expiry:
//           <input
//             type="month"
//             name="expiry"
//             value={cardInfo.expiry}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Name on Card:
//           <input
//             type="text"
//             name="nameOnCard"
//             value={cardInfo.nameOnCard}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Billing Address:
//           <input
//             type="text"
//             name="billingAddress"
//             value={cardInfo.billingAddress}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <button onClick={handleSaveInfo}>Save Info</button>
//     </div>
//   );
// };

// export default SaveCardInfoPage;


// import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// const SaveCardInfoPage = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardInfo, setCardInfo] = useState({
//     nameOnCard: "",
//     billingAddress: "",
//   });
//   const [paymentStatus, setPaymentStatus] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCardInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSaveInfo = async () => {
//     if (!stripe || !elements) {
//       setPaymentStatus("Stripe has not loaded properly.");
//       return;
//     }

//     // Create payment method
//     const card = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: card,
//       billing_details: {
//         name: cardInfo.nameOnCard,
//         address: {
//           line1: cardInfo.billingAddress,
//         },
//       },
//     });

//     if (error) {
//       setPaymentStatus(`Error: ${error.message}`);
//       return;
//     }

//     // Send paymentMethod.id to your backend for payment
//     const response = await fetch("http://localhost:5000/pay", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
//     });

//     const result = await response.json();

//     if (result.success) {
//       setPaymentStatus("Payment Successful!");
//     } else {
//       setPaymentStatus(`Payment Failed: ${result.message}`);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Save Card Information</h1>
//       <div>
//         <label>
//           Name on Card:
//           <input
//             type="text"
//             name="nameOnCard"
//             value={cardInfo.nameOnCard}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Billing Address:
//           <input
//             type="text"
//             name="billingAddress"
//             value={cardInfo.billingAddress}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>Card Details:</label>
//         <CardElement />
//       </div>
//       <button onClick={handleSaveInfo} disabled={!stripe}>
//         Save Info and Pay
//       </button>
//       {paymentStatus && <p>{paymentStatus}</p>}
//     </div>
//   );
// };

// export default SaveCardInfoPage;


import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

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
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Save Card Information
          </Typography>
          <TextField
            label="Card Number"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="CVV"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Expiry"
            name="expiry"
            type="month"
            value={cardInfo.expiry}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Name on Card"
            name="nameOnCard"
            value={cardInfo.nameOnCard}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Billing Address"
            name="billingAddress"
            value={cardInfo.billingAddress}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveInfo}
            >
              Save Info
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SaveCardInfoPage;
