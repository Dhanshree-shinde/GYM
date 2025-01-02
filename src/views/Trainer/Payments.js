
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from "@mui/material";
import axios from "axios";
import Modal from './Modal'; // Import the modal component
import UserDetailPage from './UserDetailPage'; // Import UserDetailPage
import PaymentAmount from "./PaymentAmount";

const Payments = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false); // Modal visibility state
  const [selectedClientId, setSelectedClientId] = useState(null); // Selected clientId for the modal

  const trainerId = localStorage.getItem('id');
  useEffect(() => {

    console.log(trainerId)

    axios
      .get(`http://localhost:3001/get-trainers-assigned-clients/${trainerId}`,   )

      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [trainerId]);


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlepayment = (clientId) => {


    setSelectedClientId(clientId);
    setOpenModal(true); // Open modal when a row is clicked
  };
  const handlepaymentStatus = (clientId) => {

      navigate(`/trainer/client-payment-information/${clientId}`);



  };


  const closeModal = () => {
    setOpenModal(false); // Close modal
  };

  return (
    <Box>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table aria-label="user table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow>
            <TableCell><Typography color="textSecondary" variant="h6">Name</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Action</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Status</Typography></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{user.name}</TableCell>
             <TableCell>
                <Button
                  onClick={() => handlepayment(user.id)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                    Ask for Payment

                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handlepaymentStatus(user.id)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                    Payment Status

                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for User Details */}
      <Modal show={openModal} close={closeModal}>
        <PaymentAmount clientId={selectedClientId} />
      </Modal>
    </Box>
  );
};

export default Payments;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Grid, Card, CardContent } from "@mui/material";
// import axios from "axios";
// import Modal from './Modal'; // Import the modal component
// import UserDetailPage from './UserDetailPage'; // Import UserDetailPage
// import PaymentAmount from "./PaymentAmount";
// import PaymentIcon from '@mui/icons-material/Payment';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icon for payment
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// import IconButton from '@mui/material/IconButton';

// const Payments = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [openModal, setOpenModal] = useState(false); // Modal visibility state
//   const [selectedClientId, setSelectedClientId] = useState(null); // Selected clientId for the modal

//   const trainerId = localStorage.getItem('id');
//   useEffect(() => {

//     axios
//       .get(`http://localhost:3001/get-trainers-assigned-clients/${trainerId}`)
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [trainerId]);

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handlePayment = (clientId) => {
//     setSelectedClientId(clientId);
//     setOpenModal(true); // Open modal when a row is clicked
//   };

//   const handlePaymentStatus = (clientId) => {
//     navigate(`/trainer/client-payment-information/${clientId}`);
//   };

//   const closeModal = () => {
//     setOpenModal(false); // Close modal
//   };

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#fafafa", borderRadius: 2 }}>
//       {/* Search bar */}
//       <TextField
//         label="Search Users"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         onChange={(e) => setSearch(e.target.value)}
//         sx={{ marginBottom: 3 }}
//       />

//       {/* Users Table */}
//       <Table aria-label="user table" sx={{ whiteSpace: "nowrap" }}>
//         <TableHead>
//           <TableRow>
//             <TableCell><Typography variant="h6" color="textSecondary" fontWeight="bold">Name</Typography></TableCell>
//             <TableCell><Typography variant="h6" color="textSecondary" fontWeight="bold">Ask for payment</Typography></TableCell>
//             <TableCell><Typography variant="h6" color="textSecondary" fontWeight="bold">Status</Typography></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredUsers.map((user) => (
//             <TableRow key={user.id} sx={{ cursor: 'pointer', "&:hover": { backgroundColor: "#f1f1f1" } }}>
//               <TableCell>{user.name}</TableCell>

//               <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <IconButton 
//                   onClick={() => handlePayment(user.id)}
//                   sx={{
//                     backgroundColor: "#4caf50", // Green background for payment
//                     borderRadius: "50%", // Circular button
//                     padding: "10px", // Adequate padding
//                     boxShadow: 3, // Light shadow
//                     color: "white", // White icon color
//                     fontSize: "28px", // Icon size
//                     transition: "all 0.3s ease", // Smooth transition for hover effects
//                     "&:hover": {
//                       backgroundColor: "#388e3c", // Darker green on hover
//                       boxShadow: 6, // Stronger shadow on hover
//                       transform: "scale(1.1)", // Slight scaling effect on hover
//                     }
//                   }}
//                 >
//                   <MonetizationOnIcon />
                  
//                 </IconButton>
//               </TableCell>

//               {/* <TableCell>
//                 <Button
//                   onClick={() => handlePayment(user.id)}
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     borderRadius: 3,
//                     padding: "6px 16px",
//                     textTransform: "capitalize",
//                     boxShadow: 2,
//                     "&:hover": { boxShadow: 4 }
//                   }}
//                 >
//                   Ask for Payment
//                 </Button>
//               </TableCell> */}
//               <TableCell>
//                 <Button
//                   onClick={() => handlePaymentStatus(user.id)}
//                   variant="outlined"
//                   color="primary"
//                   sx={{
//                     borderRadius: 3,
//                     padding: "6px 16px",
//                     textTransform: "capitalize",
//                     boxShadow: 2,
//                     "&:hover": { boxShadow: 4 }
//                   }}
//                 >
//                   Payment Status
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Modal for User Details */}
//       <Modal show={openModal} close={closeModal}>
//         <PaymentAmount clientId={selectedClientId} />
//       </Modal>
//     </Box>
//   );
// };

// export default Payments;
