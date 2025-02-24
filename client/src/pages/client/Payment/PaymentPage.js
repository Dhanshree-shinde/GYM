import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Button,
  CircularProgress,
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

const PaymentPage = () => {
  const clientId = localStorage.getItem("id");
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      console.warn("Loading timed out after 60 seconds");
    }, 60000);

    axios
      .get(`http://localhost:3001/get-payment-info/${clientId}`)
      .then((response) => {
        setPayment(response.data);
        setLoading(false);
        clearTimeout(timeoutId);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        clearTimeout(timeoutId);
      });

    return () => clearTimeout(timeoutId);
  }, [clientId]);

  const handleCompletePayment = (paymentId, amount) => {
    navigate(`/client/save-card-info/`, { state: { paymentId, amount } });
  };

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={80} thickness={4} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Payments
          </Typography>
          {payment.map((pay) => (
            <Card
              key={pay.id}
              sx={{
                animation: `${fadeIn} 0.5s ease-in-out`,
                backgroundColor: pay.payment_status === "Completed" ? "#f0f0f0" : "#ffffff",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                },
                mb: 3,
              }}
            >
              <CardContent>
                <Typography variant="h5">Payment Amount: {pay.payment_amount}</Typography>
                <Typography variant="h6">Requested Date: {pay.payment_requested_date}</Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                  {pay.payment_status === "Pending" ? (
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(90deg, #2196f3, #21cbf3)",
                        color: "white",
                        borderRadius: "20px",
                        padding: "8px 20px",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 0px 10px #21cbf3",
                          background: "linear-gradient(90deg, #1976d2, #2196f3)",
                        },
                      }}
                      onClick={() => handleCompletePayment(pay.id, pay.payment_amount)}
                    >
                      Complete Payment
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled
                      sx={{
                        background: "linear-gradient(90deg, #d3d3d3, #e6e6e6)",
                        color: "#a3a3a3",
                        cursor: "not-allowed",
                      }}
                    >
                      Payment Completed
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
