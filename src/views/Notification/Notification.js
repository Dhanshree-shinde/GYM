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

const Notification = () => {
    const userId = localStorage.getItem('id');
    const [notification, setNotification] = useState([]);
    const [assignedClients, setAssignedClients] = useState(new Set()); // Tracks assigned clients
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch all users and assigned clients from backend
    useEffect(() => {
        // Fetch users from the backend
        axios
            .get(`http://localhost:3001/get-notification/${userId}`)
            .then((response) => {
                setNotification(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });


    }, [userId]);

    const handleMarkAsRead = (notificationId) => {
        setLoading(true);
        axios
            .put(`http://localhost:3001/mark-as-read/${notificationId}`)
            .then((response) => {
                alert(response.data.message); // Show success message
    
                // Update notification state to mark it as read
                setNotification((prevNotifications) =>
                    prevNotifications.map((notify) =>
                        notify.id === notificationId
                            ? { ...notify, status: "read" }
                            : notify
                    )
                );
    
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error marking notification as read:", error);
                setLoading(false);
                alert("Error marking as read");
            });
    };
    


    

    return (
        <Box>
            <Typography color="textSecondary" variant="h1">
                Notications
            </Typography>
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
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Description
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
                    {notification.map((notify) => (
                        <TableRow key={notify.id}>
                            <TableCell>{notify.notification_title}</TableCell>
                            <TableCell>{notify.notification_description}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => handleMarkAsRead(notify.id)}
                                    disabled={notify.status === "read" || loading}
                                    sx={{
                                        backgroundColor: notify.status === "read" ? "lightgray" : "#1976d2",
                                        "&:hover": {
                                            backgroundColor:
                                                notify.status === "read" ? "lightgray" : "#1565c0",
                                        },
                                        transition: "background-color 0.3s",
                                    }}
                                >
                                    {notify.status === "read" ? "Read" : "Mark as Read"}
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Notification;
