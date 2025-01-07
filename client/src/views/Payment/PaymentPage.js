
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Button,
} from "@mui/material";

const PaymentPage = () => {
  

  const clientId = localStorage.getItem('id');

  const [paymentCycle, setPaymentCycle] = useState("monthly");
  const [dueDate, setDueDate] = useState("2024-12-31");
  const[payment,setPayment]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:3001/get-payment-info/${clientId}`)
    .then((response)=>{
      setPayment(response.data);
     
    })
    .catch((err)=>{
        console.error(err);
    })
  },[clientId])

  const handleCompletePayment = (paymentId,amount) => {
    navigate(`/client/save-card-info/`,{ state: {paymentId, amount } });
  };
  

  return (
    <Card >
      {payment.map((pay)=>(
         <Card >

   
      <CardContent variant="outlined" key={pay.id} >
        <Box 
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              Payment
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth variant="standard" sx={{ marginBottom: 3 }}>
          <Typography variant="h5" gutterBottom>
            
              Payment Amount :{pay.payment_amount}

            </Typography>

            <Typography variant="h5" gutterBottom>
              Payment requested date :{pay.payment_requested_date}

            </Typography>
            
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          {
            pay.payment_status==='Pending' ?
          (<Button
            variant="contained"
            color="primary"
            onClick={()=>{handleCompletePayment(pay.id,pay.payment_amount)}}
          >
            Complete Payment
          </Button>):(<Button
            variant="contained"
            color="primary"
            disable="true"
            sx={{
              backgroundColor: "lightgray" ,
              "&:hover": {
                backgroundColor: 
                  "lightgray"
                 
              },
              transition: "background-color 0.3s",
            }}
          >
             Payment completed
          </Button> )
          }
        </Box>
      </CardContent>
      </Card>
         ))}
    </Card>
  );
};

export default PaymentPage;
