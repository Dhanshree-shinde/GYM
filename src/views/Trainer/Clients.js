
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from "@mui/material";
import axios from "axios";
import Modal from './Modal'; // Import the modal component
import UserDetailPage from './UserDetailPage'; // Import UserDetailPage

const Clients = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false); // Modal visibility state
  const [selectedClientId, setSelectedClientId] = useState(null); // Selected clientId for the modal

  useEffect(() => {

    const trainerId = localStorage.getItem('id');

    
    axios
      .post("http://localhost:3001/get-trainers-assigned-clients", { trainerId })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleRowClick = (clientId) => {

    //   navigate(`/trainer/user-information/${clientId}`);

    setSelectedClientId(clientId);
    setOpenModal(true); // Open modal when a row is clicked
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
            <TableCell><Typography color="textSecondary" variant="h6">Email</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Phone number</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Action</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Action</Typography></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>
                <Button
                  onClick={() => navigate(`/trainer/assign-workout-plan/${user.id}`)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Assign Workout
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => navigate(`/trainer/add-client-data/${user.id}`)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Add Data
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for User Details */}
      <Modal show={openModal} close={closeModal}>
        <UserDetailPage clientId={selectedClientId} />
      </Modal>
    </Box>
  );
};

export default Clients;
