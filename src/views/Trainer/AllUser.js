import React, { useEffect, useState } from "react"; 
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [assignedClients, setAssignedClients] = useState(new Set()); // Tracks assigned clients

  // Fetch user data and assigned clients from the backend
  useEffect(() => {
    // Fetch users from backend
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch assigned clients from localStorage or backend
    const assignedFromLocalStorage = JSON.parse(localStorage.getItem("assignedClients")) || [];
    const assigned = new Set(assignedFromLocalStorage);
    setAssignedClients(assigned);
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle the add client action
  const handleAddClient = (userId) => {
    setLoading(true);
    const trainerId = localStorage.getItem('id');

    axios
      .post("http://localhost:3001/assign-client", { trainerId, clientId: userId })
      .then((response) => {
        alert(response.data.message); // Show success message
        
        // Update assigned clients state
        setAssignedClients((prev) => {
          const updated = new Set(prev).add(userId);
          localStorage.setItem("assignedClients", JSON.stringify(Array.from(updated))); // Persist in localStorage
          return updated;
        });
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error assigning client:", error);
        setLoading(false);
        alert("Error adding client");
      });
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
      <Table
        aria-label="user table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Phone number
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => handleAddClient(user.id)}
                  disabled={loading || assignedClients.has(user.id)} // Disable button if already assigned
                  sx={{
                    backgroundColor: loading ? "gray" : assignedClients.has(user.id) ? "lightgray" : "#1976d2",
                    "&:hover": {
                      backgroundColor: loading
                        ? "gray"
                        : assignedClients.has(user.id)
                        ? "lightgray"
                        : "#1565c0",
                    },
                    transition: "background-color 0.3s",
                  }}
                >
                  {loading && !assignedClients.has(user.id) ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : assignedClients.has(user.id) ? (
                    "Already Assigned"
                  ) : (
                    "Add as Client"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AllUser;
