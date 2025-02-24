

import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SaveCardInfoPage = () => {
  const location = useLocation();
  const { paymentId, amount } = location.state || {};
  const clientId = localStorage.getItem("id");
  const [billingAddress, setBillingAddress] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = (event) => {
    event.preventDefault();
    if (!nameOnCard || !billingAddress || !cardNumber || !expiryDate || !cvv) {
      setError("Please fill in all fields before proceeding.");
      return;
    }
    setError("");
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 5000);

    axios
      .put(`http://localhost:3001/add-payment-status/${clientId}`, {
        amount,
        paymentId,
        nameOnCard,
        billingAddress,
      })
      .then((response) => {
        alert(response.data.message || "Payment status updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating payment status:", err);
        alert(err.response?.data?.message || "Failed to update payment status.");
      });
  };

  return (
    <Card variant="outlined" sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Payment Information
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Name on Card"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Billing Address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="1234 5678 9012 3456"
            inputProps={{ maxLength: 19 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="MM/YY"
            />
            <TextField
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="123"
              inputProps={{ maxLength: 3 }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              size="small"
              onClick={handlePayment}
              disabled={isProcessing}
              sx={{
                background: "linear-gradient(90deg, #2196f3, #21cbf3)",
                color: "white",
                borderRadius: "15px",
                padding: "6px 12px",
                fontWeight: "bold",
                fontSize: "0.875rem",
                width: "120px", // Fixed width for small button
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 10px #21cbf3",
                },
              }}
            >
              {isProcessing ? <CircularProgress size={20} /> : "Submit"}
            </Button>
          </Box>

        </Box>
      </CardContent>
    </Card>
  );
};

export default SaveCardInfoPage;
