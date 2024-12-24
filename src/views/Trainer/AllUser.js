import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TextField,
} from "@mui/material";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch user data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            {/* <TableCell>
              <Typography color="textSecondary" variant="h6">
                Post
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Project Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Priority
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Budget
              </Typography>
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              {/* <TableCell>{user.post}</TableCell>
              <TableCell>{user.pname}</TableCell>
              <TableCell>
                <Chip
                  label={user.priority}
                  size="small"
                  sx={{
                    backgroundColor:
                      user.priority === "Low"
                        ? "primary.main"
                        : user.priority === "Medium"
                        ? "secondary.main"
                        : user.priority === "High"
                        ? "error.main"
                        : "success.main",
                    color: "#fff",
                  }}
                />
              </TableCell> */}
              {/* <TableCell align="right">${user.budget}k</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AllUser;
