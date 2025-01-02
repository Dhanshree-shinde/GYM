

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

const CheckoutForm = () => {

  const location = useLocation();
  const { paymentId, amount } = location.state || {};



  const clientId=localStorage.getItem('id')
  const [billingAddress, setBillingAddress] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(""); // To store error message


  const handlePayment = (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!nameOnCard || !billingAddress || !cardNumber || !expiryDate || !cvv) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    // Clear any previous error message
    setError("");

    // Simulate payment processing
    setIsProcessing(true);

    
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 5000); // 5 seconds loading simulation
    
    axios.put(`http://localhost:3001/add-payment-status/${clientId}`,{amount,paymentId,nameOnCard,billingAddress})
    .then((response) => {
        alert(response.data.message|| 'Payment status updated successfully!'); // Show success message

    })
    .catch((err) => {
        console.error('Error updating payment status:', err);
        alert(err.response?.data?.message || 'Failed to update payment status.');
    });




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
            Payment Information
          </Typography>

          {/* Display error message if any field is empty */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

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
          <Typography variant="body1" gutterBottom>
            Card Details
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 2,
            }}
          >
            <TextField
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="1234 5678 9012 3456"
              inputProps={{ maxLength: 19 }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="Expiry Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="MM/YY"
                inputProps={{ maxLength: 5 }}
              />
              <TextField
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="123"
                type="password"
                inputProps={{ maxLength: 3 }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            {isProcessing ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
                disabled={paymentSuccess}
              >
                {paymentSuccess ? "Payment Successful" : "Pay Now"}
              </Button>
            )}
          </Box>
          {paymentSuccess && (
            <Typography
              variant="h6"
              color="success"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Payment Successful!
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const SaveCardInfoPage = () => <CheckoutForm />;

export default SaveCardInfoPage;
