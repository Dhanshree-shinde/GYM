import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
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

const Notification = () => {
    const userId = localStorage.getItem('id');
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Set a timeout to stop loading after 60 seconds
        const timeoutId = setTimeout(() => {
            setLoading(false);
            console.warn("Loading timed out after 60 seconds");
        }, 60000);

        // Fetch notifications
        axios
            .get(`http://localhost:3001/get-notification/${userId}`)
            .then((response) => {
                setNotification(response.data);
                setLoading(false); // Stop loading if data is fetched
                clearTimeout(timeoutId); // Clear the timeout
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setLoading(false); // Stop loading on error
                clearTimeout(timeoutId); // Clear the timeout
            });

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, [userId]);

    const handleMarkAsRead = (notificationId) => {
        axios
            .put(`http://localhost:3001/mark-as-read/${notificationId}`)
            .then((response) => {
                alert(response.data.message);
                setNotification((prevNotifications) =>
                    prevNotifications.map((notify) =>
                        notify.id === notificationId
                            ? { ...notify, status: "read" }
                            : notify
                    )
                );
            })
            .catch((error) => {
                console.error("Error marking notification as read:", error);
                alert("Error marking as read");
            });
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
            <Typography color="textSecondary" variant="h1">
                Notifications
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
                        <TableRow
                            key={notify.id}
                            sx={{
                                animation: `${fadeIn} 0.5s ease-in-out`,
                                backgroundColor: notify.status === "read" ? "#f0f0f0" : "#ffffff",
                                transition: "background-color 0.3s",
                                "&:hover": {
                                    backgroundColor: "#e0f7fa",
                                },
                            }}
                        >
                            <TableCell>{notify.notification_title}</TableCell>
                            <TableCell>{notify.notification_description}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => handleMarkAsRead(notify.id)}
                                    disabled={notify.status === "read" || loading}
                                    sx={{
                                        background: notify.status === "read"
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
                                            boxShadow: notify.status === "read"
                                                ? "0px 0px 5px #aaa"
                                                : "0px 0px 10px #21cbf3",
                                            background: notify.status === "read"
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
                                    {notify.status === "read" ? "Read" : "Mark as Read"}
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Box>
        )}
        </Box>
    );
};

export default Notification;
