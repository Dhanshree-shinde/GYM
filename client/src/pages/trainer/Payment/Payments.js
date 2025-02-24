
// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from "@mui/material";
// import axios from "axios";
// import Modal from '../AssignedClients/Modal'; // Import the modal component
// import UserDetailPage from '../AssignedClients/UserDetailPage'; // Import UserDetailPage
// import PaymentAmount from "./PaymentAmount";

// const Payments = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [openModal, setOpenModal] = useState(false); // Modal visibility state
//   const [selectedClientId, setSelectedClientId] = useState(null); // Selected clientId for the modal

//   const trainerId = localStorage.getItem('id');
//   useEffect(() => {

//     console.log(trainerId)

//     axios
//       .get(`http://localhost:3001/get-trainers-assigned-clients/${trainerId}`,   )

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

//   const handlepayment = (clientId) => {


//     setSelectedClientId(clientId);
//     setOpenModal(true); // Open modal when a row is clicked
//   };
//   const handlepaymentStatus = (clientId) => {

//       navigate(`/trainer/client-payment-information/${clientId}`);



//   };


//   const closeModal = () => {
//     setOpenModal(false); // Close modal
//   };

//   return (
//     <Box>
//       <TextField
//         label="Search Users"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <Table aria-label="user table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
//         <TableHead>
//           <TableRow>
//             <TableCell><Typography color="textSecondary" variant="h6">Name</Typography></TableCell>
//             <TableCell><Typography color="textSecondary" variant="h6">Action</Typography></TableCell>
//             <TableCell><Typography color="textSecondary" variant="h6">Status</Typography></TableCell>

//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredUsers.map((user) => (
//             <TableRow
//               key={user.id}
//               style={{ cursor: 'pointer' }}
//             >
//               <TableCell>{user.name}</TableCell>
//              <TableCell>
//                 <Button
//                   onClick={() => handlepayment(user.id)}
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                 >
//                     Ask for Payment

//                 </Button>
//               </TableCell>
//               <TableCell>
//                 <Button
//                   onClick={() => handlepaymentStatus(user.id)}
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                 >
//                     Payment Status

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


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, CircularProgress } from "@mui/material";
import { keyframes } from "@emotion/react";
import axios from "axios";
import Modal from '../AssignedClients/Modal';
import PaymentAmount from "./PaymentAmount";

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

const Payments = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const trainerId = localStorage.getItem('id');
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      console.warn("Loading timed out after 60 seconds");
    }, 60000);

    axios.get(`http://localhost:3001/get-trainers-assigned-clients/${trainerId}`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        clearTimeout(timeoutId);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
        clearTimeout(timeoutId);
      });

    return () => clearTimeout(timeoutId);
  }, [trainerId]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePayment = (clientId) => {
    setSelectedClientId(clientId);
    setOpenModal(true);
  };

  const handlePaymentStatus = (clientId) => {
    navigate(`/trainer/client-payment-information/${clientId}`);
  };

  const closeModal = () => {
    setOpenModal(false);
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
                  sx={{
                    animation: `${fadeIn} 0.5s ease-in-out`,
                    backgroundColor: "#ffffff",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                    },
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handlePayment(user.id)}
                      variant="contained"
                      size="large"
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
                    >
                      Ask for Payment
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handlePaymentStatus(user.id)}
                      variant="contained"
                      size="large"
                      sx={{
                        background: "linear-gradient(90deg, #ff9800, #ffb74d)",
                        color: "white",
                        borderRadius: "20px",
                        padding: "8px 20px",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 0px 10px #ffb74d",
                          background: "linear-gradient(90deg, #f57c00, #ff9800)",
                        },
                      }}
                    >
                      Payment Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Modal show={openModal} close={closeModal}>
        <PaymentAmount clientId={selectedClientId} />
      </Modal>
    </Box>
  );
};

export default Payments;
