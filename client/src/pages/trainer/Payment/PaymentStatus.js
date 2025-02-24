
import React, { useState } from "react";
import { useEffect } from "react";
import { keyframes } from "@emotion/react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
 
} from "@mui/material";
import { useParams } from "react-router-dom";

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
const PaymentStatus = () => {
  

  const {clientId} = useParams();

 
  const[payment,setPayment]=useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:3001/get-payment-info/${clientId}`)
    .then((response)=>{
      setPayment(response.data);
      console.log(response.data);
     
    })
    .catch((err)=>{
        console.error(err);
    })
  },[clientId])



  return (
    <Card >
         <Box 
            >
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              Payment Status
            </Typography>
          </Box>
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
         
        </Box>
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth variant="standard" sx={{ marginBottom: 3 ,
                                animation: `${fadeIn} 0.5s ease-in-out`,
                                transition: "background-color 0.3s",
                                "&:hover": {
                                    backgroundColor: "#e0f7fa",
                                },
                            }}>
          <Typography variant="h5" gutterBottom>
            
              Payment Amount :{pay.payment_amount}

            </Typography>

            <Typography variant="h5" gutterBottom>
              Payment requested date :{pay.payment_requested_date}

            </Typography>
            <Typography variant="h5" gutterBottom>
            
              Payment Status :{pay.payment_status}

            </Typography>
            <Typography variant="h5" gutterBottom>
            
              Payment date :{pay.payment_date}
            </Typography>
            <Typography variant="h5" gutterBottom>
            
              Name on card :{pay.name_on_card}

            </Typography>
            <Typography variant="h5" gutterBottom>
            
              Billing address :{pay.billing_address}

            </Typography>
            
            
          </FormControl>
        </Box>
        
      </CardContent>
      </Card>
         ))}
    </Card>
  );
};

export default PaymentStatus;
