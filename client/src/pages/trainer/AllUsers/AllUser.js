

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
import { keyframes } from "@emotion/react";
import axios from "axios";

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

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [assignedClients, setAssignedClients] = useState(new Set());
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching user data:", error));

    axios.get("http://localhost:3001/get-all-assigned-clients")
      .then((response) => {
        setAssignedClients(new Set(response.data.map(client => client.client_id)));
      })
      .catch((error) => console.error("Error fetching assigned clients:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClient = (userId) => {
    setLoading(true);
    const trainerId = localStorage.getItem('id');
    
    axios.post("http://localhost:3001/assign-client", { trainerId, clientId: userId })
      .then((response) => {
        alert(response.data.message);
        setAssignedClients((prev) => new Set(prev).add(userId));
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
      <Table sx={{ mt: 3, whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow>
            <TableCell><Typography color="textSecondary" variant="h6">Name</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Email</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Phone Number</Typography></TableCell>
            <TableCell><Typography color="textSecondary" variant="h6">Action</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                animation: `${fadeIn} 0.5s ease-in-out`,
                backgroundColor: assignedClients.has(user.id) ? "#f0f0f0" : "#ffffff",
                transition: "background-color 0.3s",
                "&:hover": { backgroundColor: "#e0f7fa" },
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleAddClient(user.id)}
                  disabled={loading || assignedClients.has(user.id)}
                  sx={{
                    background: assignedClients.has(user.id)
                      ? "linear-gradient(90deg, #cfcfcf, #e0e0e0)"
                      : "linear-gradient(90deg, #2196f3, #21cbf3)",
                    color: "white",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: assignedClients.has(user.id)
                        ? "0px 0px 5px #aaa"
                        : "0px 0px 10px #21cbf3",
                      background: assignedClients.has(user.id)
                        ? "linear-gradient(90deg, #e0e0e0, #f0f0f0)"
                        : "linear-gradient(90deg, #1976d2, #2196f3)",
                    },
                    "&:disabled": {
                      background: "linear-gradient(90deg, #d3d3d3, #e6e6e6)",
                      color: "#a3a3a3",
                      cursor: "not-allowed",
                    },
                  }}
                >
                  {assignedClients.has(user.id) ? "Assigned" : "Assign Client"}
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
