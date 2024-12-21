// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PaymentPage = () => {
//   const [paymentCycle, setPaymentCycle] = useState("monthly");
//   const [dueDate, setDueDate] = useState("2024-12-31"); // Example due date
//   const navigate = useNavigate();

//   const handleCompletePayment = () => {
//     navigate("/save-card-info");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Payment</h1>
//       <div>
//         <label>
//           Payment Cycle:
//           <select
//             value={paymentCycle}
//             onChange={(e) => setPaymentCycle(e.target.value)}
//           >
//             <option value="monthly">Monthly</option>
//             <option value="annual">Annual</option>
//           </select>
//         </label>
//       </div>
//       <div>
//         <label>
//           Next Payment Due Date:
//           <input
//             type="date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />
//         </label>
//       </div>
//       <button onClick={handleCompletePayment}>Complete Payment</button>
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";

const PaymentPage = () => {
  const [paymentCycle, setPaymentCycle] = useState("monthly");
  const [dueDate, setDueDate] = useState("2024-12-31");
  const navigate = useNavigate();

  const handleCompletePayment = () => {
    navigate("/save-card-info");
  };

  return (
    <Card variant="outlined">
      <CardContent>
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
            <Typography variant="h6" gutterBottom>
              Payment Cycle:
            </Typography>
            <Select
              value={paymentCycle}
              onChange={(e) => setPaymentCycle(e.target.value)}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="annual">Annual</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              Next Payment Due Date:
            </Typography>
            <TextField
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompletePayment}
          >
            Complete Payment
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentPage;
