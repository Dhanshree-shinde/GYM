import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../css/UserDetailPage.css'; // External CSS for styling
import { TextField,Button } from '@mui/material';

function PaymentAmount({ clientId }) {
    const trainerId=localStorage.getItem("id");
  const [user, setUser] = useState(null);
  const[amount,setAmount]=useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/single-user-detail/${clientId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [clientId]); // This effect runs whenever clientId changes

  if (!user) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleSend=()=>{
    axios.post(`http://localhost:3001/save-payment-amount`,{clientId,trainerId,amount})
    .then((response)=>{
        alert("Requested for payment!!!")
        console.log(response);

    })
    .catch((err)=>{
        console.error(err);

    })

  }



  return (
    <div className="user-detail-container">
      <h1 className="user-detail-heading">Payment</h1>
      <div className="user-detail-card">
        <div className="user-detail-item">

          <strong>Name:</strong> {user.name}
        </div>
        <div className="user-detail-item">
        <strong>Enter Payment Amount </strong> 


             
        </div>
        <div className="user-detail-item">
        <TextField
        type="number"
        onChange={(e)=>{
            setAmount(e.target.value)

        }}

        
        />

             
        </div>
        <div className="user-button" >
        <Button
            onClick={handleSend}       
        >
            Send
            </Button>

             
        </div>
        
        
        
      </div>
    </div>
  );
}

export default PaymentAmount;
