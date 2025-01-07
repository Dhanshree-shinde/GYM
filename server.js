// server.js
const express = require('express');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = 3001;
const multer = require('multer');
const path = require('path')



// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123', // Replace with your MySQL password
  database: 'gym'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL');
  }
});


// Example of a token blacklist (use a database or cache in production)
const tokenBlacklist = new Set();

// Logout route
app.post('/logout', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the header

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    // Verify the token (optional, to ensure it's a valid JWT before blacklisting)
    jwt.verify(token, process.env.JWT_SECRET);

    // Add token to the blacklist (or store in a database)
    tokenBlacklist.add(token);

    // Respond to the client
    res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid token' });
  }
});

// Middleware to check if a token is blacklisted (for protected routes)
const isTokenBlacklisted = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (tokenBlacklist.has(token)) {
    return res.status(403).json({ message: 'Token is blacklisted' });
  }
  next();
};

// Example usage of middleware for a protected route
app.get('/protected-route', isTokenBlacklisted, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});



// app.post('/register', async (req, res) => {
//   const {
//     name,
//     phone,
//     email,
//     password,
//     weight,
//     height,
//     photo,
//     dateOfBirth,
//     gender,
//     role
//   } = req.body;

//   console.log(name, phone, email, password, weight, height, photo, dateOfBirth, gender, role);
//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const query = `INSERT INTO user (name, phone_number, email, password, weight, height, photo_url, date_of_birth, gender, role)
//                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(
//     query,
//     [name, phone, email, hashedPassword, weight, height, photo, dateOfBirth, gender, role],
//     (err, result) => {
//       if (err) {
//         if (err.code === 'ER_DUP_ENTRY') {
//           return res.status(400).json({ message: 'Email already exists' });
//         }
//         console.error(err);
//         return res.status(500).json({ message: 'Database error' });
//       }
//       res.status(201).json({ message: 'User registered successfully' });
//     }
//   );
// });



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')

  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));

  }
})

const upload = multer({
  storage: storage
})

//using object ip blocking
// const registrationRateLimiter = {}; // Memory store for tracking registration attempts


// // Route: Register user
// app.post('/register', upload.single('photo'), async (req, res) => {
//   const clientIp = req.ip; // Get client IP address


//   const {
//     name,
//     phone,
//     email,
//     password,
//     weight,
//     height,
//     dateOfBirth,
//     gender,
//     role
//   } = req.body;

//   const photo = req.file.filename; // This is the correct reference for the uploaded file
//   if (!registrationRateLimiter[clientIp]) {
//     registrationRateLimiter[clientIp] = { attempts: 0, blockedUntil: null };
//   }

//   const clientData = registrationRateLimiter[clientIp];

//   // Check if IP is blocked and reset if necessary
//   if (isIPBlocked(clientIp, clientData)) {
//     const waitTime = Math.ceil((clientData.blockedUntil - new Date()) / 60000);
//     return res.status(429).json({ message: `IP blocked. Try again in ${waitTime} minutes.` });
//   }



//   // Validate required fields
//   if (!name || !email || !password || !phone) {

//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const query = `INSERT INTO user (name, phone_number, email, password, weight, height, photo_url, date_of_birth, gender, role)
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(
//     query,
//     [name, phone, email, hashedPassword, weight, height, photo, dateOfBirth, gender, role],
//     (err, result) => {
//       if (err) {
//         if (err.code === 'ER_DUP_ENTRY') {
//           return res.status(400).json({ message: 'Email already exists' });
//         }
//         console.error(err);
//         return res.status(500).json({ message: 'Database error' });
//       }

//       clientData.attempts += 1;
//         checkAndBlock(clientIp, clientData);
//       res.status(201).json({ message: 'User registered successfully' });
//     }
//   );
// });

// function checkAndBlock(ip, data) {
//   const currentTime = new Date();

//   if (data.attempts >= 5) {
//     data.blockedUntil = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // Block for 24 hours
//   }
// }

// // Reset attempts after block expiration
// function isIPBlocked(ip, data) {
//   const currentTime = new Date();

//   if (data.blockedUntil && data.blockedUntil <= currentTime) {
//     // Reset the attempt count and unblocking status after 24 hours
//     data.attempts = 0;
//     data.blockedUntil = null;
//   }

//   return data.blockedUntil && data.blockedUntil > currentTime;
// }



// const loginRateLimiter = {}; // Memory store for tracking login attempts

// app.post('/login', (req, res) => {
//   const clientIp = req.ip; // Get client IP address
//   const { email, password } = req.body;

//   if (!loginRateLimiter[clientIp]) {
//     loginRateLimiter[clientIp] = { attempts: 0, blockedUntil: null };
//   }

//   const clientData = loginRateLimiter[clientIp];

//   // Check if IP is blocked and reset if necessary
//   if (isIPBlocked(clientIp, clientData)) {
//     const waitTime = Math.ceil((clientData.blockedUntil - new Date()) / 60000);
//     return res.status(429).json({ message: `IP blocked. Try again in ${waitTime} minutes.` });
//   }


//   const query = `SELECT * FROM user WHERE email = ?`;

//   db.query(query, [email], async (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Database error' });
//     }

//     if (results.length === 0) {
//       clientData.attempts += 1;
//       checkAndBlockLogin(clientIp, clientData);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const user = results[0];
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       clientData.attempts += 1;


//       checkAndBlockLogin(clientIp, clientData);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Reset attempts on successful login
//     clientData.attempts = 0;
//     clientData.blockedUntil = null;

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ message: 'Login successful', token, id: user.id, role: user.role });
//   });
// });

// // Helper function to handle blocking logic based on login attempts
// function checkAndBlockLogin(ip, data) {
//   const currentTime = new Date();

//   // Block for 48 hours after 20 attempts
//   if (data.attempts >= 20) {
//     data.blockedUntil = new Date(currentTime.getTime() + 48 * 60 * 60 * 1000); // Block for 48 hours
//   }
//   // Block for 2 hours after 10 attempts
//   else if (data.attempts >= 10) {
//     data.blockedUntil = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000); // Block for 2 hours
//   }
//   // Block for 15 minutes after 5 attempts
//   else if (data.attempts >= 5) {
//     data.blockedUntil = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000); // Block for 2 hours
//   }
//   // Block for 15 minutes after 3 attempts
//   else if (data.attempts >= 3) {
//     data.blockedUntil = new Date(currentTime.getTime() + 15 * 60 * 1000); // Block for 15 minutes
//   }
// }

// Helper function to check IP block status for account creation
const isIPBlockedForRegistration = async (ipAddress) => {
  const query = `
    SELECT COUNT(*) AS accounts, 
           MAX(attempt_time) AS last_attempt 
    FROM failed_request 
    WHERE ip_address = ?
      AND attempt_time >= NOW() - INTERVAL 24 HOUR AND action_perform='register'
  `;

  const [results] = await db.promise().query(query, [ipAddress]);
  const { accounts } = results[0];

  return accounts >= 5; // Block if 5 accounts were created in the last 24 hours
};

// Register endpoint
app.post('/register', upload.single('photo'), async (req, res) => {
  const {
    name,
    phone,
    email,
    password,
    weight,
    height,
    dateOfBirth,
    gender,
    role,
  } = req.body;

  const action = "register";
  const ipAddress = req.ip; // Capture user's IP address
  const photo = req.file ? req.file.filename : null; // Uploaded file

  try {
    // Check if the IP is blocked for account creation
    const isBlocked = await isIPBlockedForRegistration(ipAddress);
    if (isBlocked) {
      await db.promise().query(
        'INSERT INTO failed_request (ip_address, attempt_email,action_perform) VALUES (?, ?,?)',
        [ipAddress, email, action]
      );
      return res.status(403).json({
        message: 'Too many accounts created from this IP address. Please try again after 24 hours.',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO user (name, phone_number, email, password, weight, height, photo_url, date_of_birth, gender, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [name, phone, email, hashedPassword, weight, height, photo, dateOfBirth, gender, role],
      async (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists' });
          }
          console.error(err);
          return res.status(500).json({ message: 'Database error' });
        }

        // Log account creation attempt
        await db.promise().query(
          'INSERT INTO failed_request (ip_address, attempt_email,action_perform) VALUES (?, ?,?)',
          [ipAddress, email, action]
        );

        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Helper function to check IP block status
const isIPBlocked = async (ipAddress) => {
  const query = `
    SELECT COUNT(*) AS attempts, 
           MAX(attempt_time) AS last_attempt 
    FROM failed_request  
    WHERE ip_address = ?
      AND attempt_time >= NOW() - INTERVAL 48 HOUR AND action_perform='login'
  `;

  const [results] = await db.promise().query(query, [ipAddress]);
  const { attempts, last_attempt } = results[0];

  if (attempts >= 20 && new Date() - new Date(last_attempt) < 48 * 60 * 60 * 1000) {
    return { blocked: true, duration: '48 hours' };
  } else if (attempts >= 10 && new Date() - new Date(last_attempt) < 2 * 60 * 60 * 1000) {
    return { blocked: true, duration: '2 hours' };
  } else if (attempts >= 3 && new Date() - new Date(last_attempt) < 15 * 60 * 1000) {
    return { blocked: true, duration: '15 minutes' };
  }

  return { blocked: false };
};

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const ipAddress = req.ip; // Capture user's IP address
  const action = "login";

  try {
    // Check if the IP is blocked
    const blockStatus = await isIPBlocked(ipAddress);
    if (blockStatus.blocked) {
      await db.promise().query(
        'INSERT INTO failed_request (ip_address, attempt_email,action_perform) VALUES (?, ?, ?)',
        [ipAddress, email, action]
      );
      return res.status(403).json({
        message: `IP address blocked for ${blockStatus.duration} due to multiple failed attempts.`,
      });
    }

    const query = `SELECT * FROM user WHERE email = ?`;
    const [results] = await db.promise().query(query, [email]);

    if (results.length === 0) {
      // Log failed attempt
      await db.promise().query(
        'INSERT INTO failed_request (ip_address, attempt_email,action_perform) VALUES (?, ?, ?)',
        [ipAddress, email, action]
      );
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      // Log failed attempt
      await db.promise().query(
        'INSERT INTO failed_request (ip_address, attempt_email, attempt_password,action_perform) VALUES (?, ?,?, ?)',
        [ipAddress, email, password, action]
      );
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If login is successful, reset attempts for the IP
    await db.promise().query(`DELETE FROM failed_request WHERE ip_address = ? AND action_perform='login'`, [ipAddress]);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      id: user.id,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get("/users", (req, res) => {
  const query = "SELECT id, name, email, phone_number FROM user WHERE role = 'Client'";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});

app.get('/get-all-assigned-clients', (req, res) => {
  const query = 'SELECT client_id FROM trainer_clients';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(result); // Send the client details to the frontend
    }
  });
});


app.get('/get-trainers-assigned-clients/:trainerId', (req, res) => {

  const { trainerId } = req.params;

  console.log(trainerId)
  // Query to get the clients assigned to the trainer
  const trainerQuery = `
    SELECT 
      u.id, u.name, u.email, u.phone_number 
    FROM trainer_clients tc
    JOIN user u ON tc.client_id = u.id
    WHERE tc.trainer_id = ?;
  `;

  db.query(trainerQuery, [trainerId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results); // Send the client details to the frontend
    }
  });
});



app.post('/assign-client', (req, res) => {
  const { trainerId, clientId } = req.body;

  // Validate trainer role
  const validateTrainerQuery = 'SELECT id FROM user WHERE id = ? AND role = ?';
  const validateClientQuery = 'SELECT id FROM user WHERE id = ? AND role = ?';
  const checkIfAssignedQuery = 'SELECT * FROM trainer_clients WHERE client_id = ?';
  const insertAssignmentQuery = 'INSERT INTO trainer_clients (trainer_id, client_id) VALUES (?, ?)';
  const notification = 'INSERT INTO notification (user_id, notification_title, notification_description) VALUES (?,?,?)';
  const title = "Trainer Assigned";
  const description = "New Trainer has been assigned to you";

  // Check if the trainer exists
  db.query(validateTrainerQuery, [trainerId, 'trainer'], (trainerErr, trainerResult) => {
    if (trainerErr || trainerResult.length === 0) {
      return res.status(400).json({ message: 'Invalid trainer ID or user is not a trainer.' });
    }

    // Check if the client exists
    db.query(validateClientQuery, [clientId, 'client'], (clientErr, clientResult) => {
      if (clientErr || clientResult.length === 0) {
        return res.status(400).json({ message: 'Invalid client ID or user is not a client.' });
      }

      // Check if client is already assigned to another trainer
      db.query(checkIfAssignedQuery, [clientId], (assignErr, assignResult) => {
        if (assignErr) {
          console.error(assignErr);
          return res.status(500).json({ message: 'Internal server error.' });
        }

        if (assignResult.length > 0) {
          return res.status(400).json({ message: 'Client is already assigned to another trainer.' });
        }

        // Attempt to insert the assignment
        db.query(insertAssignmentQuery, [trainerId, clientId], (insertErr) => {
          if (insertErr) {
            console.error(insertErr);
            return res.status(500).json({ message: 'Internal server error.' });
          }

          res.status(200).json({ message: 'Client successfully assigned to trainer.' });
        });

        db.query(notification, [clientId, title, description], (err) => {
          if (err) {
            console.error(err);
          }
          console.log("notification added")
        })
      });
    });
  });
});

app.put("/mark-as-read/:id", (req, res) => {
  const notificationId = req.params.id;
  const query = `UPDATE notification SET status = 'read' WHERE id = ?`;

  db.query(query, [notificationId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update notification status" });
    } else {
      res.json({ message: "Notification marked as read" });
    }
  });
});


app.put("/add-payment-status/:id", (req, res) => {
  const clientId = req.params.id;
  const { amount, paymentId, nameOnCard, billingAddress } = req.body;

  const query = `UPDATE payment SET payment_status = 'Paid' ,payment_date=CURDATE(),name_on_card=?,billing_address=? WHERE client_id = ? AND id=? AND payment_amount=?`;


  db.query(query, [nameOnCard, billingAddress, clientId, paymentId, amount], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update payment status" });
    } else {
      res.json({ message: "Payment status updated" });
    }
  });
});



app.get("/get-notification/:userId", (req, res) => {
  const { userId } = req.params;
  const query = `SELECT * FROM notification WHERE user_id = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});


app.get('/get-workout-plan/:clientId', (req, res) => {
  const { clientId } = req.params;

  const query = 'SELECT * FROM trainer_clients WHERE client_id = ?';
  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching workout plan" });
    }
    if (results.length > 0) {
      const plan = results[0];

      // console.log(plan);
      res.json({
        monday: { title: plan.monday_title, description: plan.monday_description },
        tuesday: { title: plan.tuesday_title, description: plan.tuesday_description },
        wednesday: { title: plan.wednesday_title, description: plan.wednesday_description },
        thursday: { title: plan.thursday_title, description: plan.thursday_description },
        friday: { title: plan.friday_title, description: plan.friday_description },
        saturday: { title: plan.saturday_title, description: plan.saturday_description },
        sunday: { title: plan.sunday_title, description: plan.sunday_description },
      });
    } else {
      res.json({
        monday: { title: "", description: "" },
        tuesday: { title: "", description: "" },
        wednesday: { title: "", description: "" },
        thursday: { title: "", description: "" },
        friday: { title: "", description: "" },
        saturday: { title: "", description: "" },
        sunday: { title: "", description: "" },
      });
    }
  });
});


app.post('/save-workout-plan', (req, res) => {
  const { clientId, workoutPlan } = req.body;

  const title = "New WorkoutPlan Assigned";
  const description = "New WorkoutPlan Assigned has been assigned to you by your trianer";
  const notification = 'INSERT INTO notification (user_id, notification_title, notification_description) VALUES (?,?,?)';

  const query = `
  UPDATE trainer_clients
  SET 
    monday_title = ?, monday_description = ?, 
    tuesday_title = ?, tuesday_description = ?, 
    wednesday_title = ?, wednesday_description = ?, 
    thursday_title = ?, thursday_description = ?, 
    friday_title = ?, friday_description = ?, 
    saturday_title = ?, saturday_description = ?, 
    sunday_title = ?, sunday_description = ?
  WHERE client_id = ?;
`;

  db.query(
    query,
    [
      workoutPlan.monday.title, workoutPlan.monday.description,
      workoutPlan.tuesday.title, workoutPlan.tuesday.description,
      workoutPlan.wednesday.title, workoutPlan.wednesday.description,
      workoutPlan.thursday.title, workoutPlan.thursday.description,
      workoutPlan.friday.title, workoutPlan.friday.description,
      workoutPlan.saturday.title, workoutPlan.saturday.description,
      workoutPlan.sunday.title, workoutPlan.sunday.description,
      clientId
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving workout plan" });
      }
      res.status(200).json({ message: "Workout plan saved successfully" });
    }
  );
  db.query(notification, [clientId, title, description], (err) => {
    if (err) {
      console.error(err);
    }
    console.log("notification added")
  })
});

app.get('/single-user-detail/:clientId', (req, res) => {
  const { clientId } = req.params;
  const query = `SELECT name, email, phone_number, weight, height, photo_url, date_of_birth, gender FROM user WHERE id = ?`;

  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }


    // Check if results are returned, and send the first result
    if (results.length > 0) {

      results[0].date_of_birth = moment(results[0].date_of_birth)
        .tz('Asia/Kolkata')  // Convert to the desired timezone
        .format('YYYY-MM-DD');  // Format to 'YYYY-MM-DD'

      res.json(results[0]); // Send the first user object
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});


app.get('/get-payment-info/:clientId', (req, res) => {
  const { clientId } = req.params;

  const query = `SELECT * FROM payment WHERE client_id = ?`;

  db.query(query, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }



    const moment = require('moment-timezone');

    // Check if results are returned, and send the first result
    if (results.length > 0) {
      const formattedResults = results.map(record => {
        record.payment_requested_date =record.payment_requested_date? moment(record.payment_requested_date)
          .tz('Asia/Kolkata')
          .format('YYYY-MM-DD'):null;
        record.payment_date = record.payment_date?moment(record.payment_date)
          .tz('Asia/Kolkata')
          .format('YYYY-MM-DD'):null;
        return record;
      });



      // console.log(response[0]) // Send the first user object
      res.json(formattedResults);
    } else {
      res.status(404).json({ error: "record not found" });
    }
  });
});
app.get('/get-trainer-name/:clientId', (req, res) => {
  const clientId = req.params.clientId; // Extract clientId from params
  const getTrainerNameQuery = `
    SELECT 
      u.name 
    FROM trainer_clients tc
    JOIN user u ON tc.trainer_id = u.id
    WHERE tc.client_id = ?;`;

  db.query(getTrainerNameQuery, [clientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length > 0) {
      res.json(results[0]); // Send the first trainer object
    } else {
      res.status(404).json({ error: "Trainer not assigned to this client" });
    }
  });
});

app.post('/upload-photo', upload.single('photo'), (req, res) => {

  const { clientId, } = req.body;
  const photo = req.file.filename; // This is the correct reference for the uploaded file
  // const clientId=req.body.clientId;

  const query = `UPDATE user SET photo_url=? WHERE id =?`;

  db.query(query, [photo, clientId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error uploading photo" });
    }
    else {

      res.json({ photo_url: photo });
    }


  })
})



app.post('/save-client-info', (req, res) => {
  const { clientId, user } = req.body;





  const query = `UPDATE user SET name=?,  phone_number=?, height=?, weight=?, date_of_birth=? WHERE id=?`;

  db.query(query, [
    user.name,

    user.phone_number,
    user.height,
    user.weight,

    user.date_of_birth,
    clientId
  ], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving user information" });
    }
    res.status(200).json({ message: "User information saved successfully" });
  });


});

app.post('/remover-clients-trainer', (req, res) => {
  const { clientId } = req.body;
  const query = 'DELETE  FROM trainer_clients WHERE client_id=?';
  db.query(query, [clientId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting Trainer" });
    }
    return res.status(201).json({ message: 'data deleted successfully' })


  })
})
app.post('/save-payment-amount', (req, res) => {
  const { clientId, trainerId, amount } = req.body;


  const notification = 'INSERT INTO notification (user_id, notification_title, notification_description) VALUES (?,?,?)';
  const title = "payment";
  const description = "Trainer Ask for payment";


  const query = 'INSERT INTO payment (client_id,trainer_id,payment_amount) VALUES(?,?,?)';
  db.query(query, [clientId, trainerId, amount], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error Inserting record" });
    }
    return res.status(201).json({ message: 'data entered successfully' })


  })
  db.query(notification, [clientId, title, description], (err) => {
    if (err) {
      console.error(err);
    }
  })

})
app.post('/update-client-height-weight', (req, res) => {
  const { clientId, clientData } = req.body;
  const query = 'UPDATE user SET height=?,weight=? WHERE id=?';
  db.query(query, [clientData.height, clientData.weight, clientId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' })
    }
    return res.status(201).json({ message: 'data entered successfully' })
  })

  //   app.post('/add-payment-status', (req, res) => {
  //     const { clientId } = req.body;
  //     if (!clientId) {
  //         return res.status(400).json({ message: 'Client ID is missing' });
  //     }
  //     const status = 'Paid';
  //     const query = `UPDATE payment SET payment_status=?, payment_date=CURDATE() WHERE client_id=?`;


  //     db.query(query, [status, clientId], (err, result) => {
  //       console.log(query)
  //         if (err) {
  //             console.error('Database error:', err);
  //             return res.status(500).json({ message: 'Database error', error: err });
  //         }
  //         if (result.affectedRows === 0) {
  //             return res.status(404).json({ message: 'Client not found' });
  //         }
  //         return res.status(200).json({ message: 'Payment status updated successfully' });
  //     });
  // });


})
app.post('/save-client-health-data', async (req, res) => {
  const {
    clientId, clientData
  } = req.body;

  const notification = 'INSERT INTO notification (user_id, notification_title, notification_description) VALUES (?,?,?)';
  const title = "Health data updated ";
  const description = "Trainer updated your health data ";

  const query = `INSERT INTO client_health (client_id,_date, height, weight, speed, bmi, stamina)
                  VALUES (?, ?, ?, ?, ?, ?,? )`;

  db.query(
    query,
    [clientId, clientData.date, clientData.weight, clientData.height, clientData.bmi, clientData.speed, clientData.stamina],
    (err, result) => {
      if (err) {

        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'data entered successfully' });
    }
  );
  db.query(notification, [clientId, title, description], (err) => {
    if (err) {
      console.error(err);
    }
  })
});


app.get('/get-client-height/:clientId', async (req, res) => {
  const clientId = req.params.clientId;

  const query = `
    SELECT 
        YEAR(_date) AS year,
        MONTH(_date) AS month,
        AVG(height) AS avg_height
    FROM 
        client_health
    WHERE 
        client_id = ?
    GROUP BY 
        YEAR(_date), MONTH(_date)
    ORDER BY 
        year, month;
  `;
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });


    // Initialize response array for 12 months (index 0-11)
    const response = Array(12).fill(0);

    // Check if the results are in the expected format
    if (results.length === 0) {
      console.log("No data found for this clientId.");
    } else {
      // Map the results to the response array
      results.forEach(({ month, avg_height }) => {
        if (month >= 1 && month <= 12) {
          response[month - 1] = avg_height; // Map avg_speed to correct month index
        } else {
          console.warn(`Invalid month value: ${month}`);
        }
      });
    }

    // Send response
    res.json(response); // Send valid JSON response
  } catch (error) {
    console.error("Error fetching client health data:", error);
    res.status(500).json({ error: 'Error fetching client health data' }); // Always send JSON
  }
});

app.get('/get-client-weight/:clientId', async (req, res) => {
  const clientId = req.params.clientId;

  const query = `
    SELECT 
        YEAR(_date) AS year,
        MONTH(_date) AS month,
        AVG(weight) AS avg_weight
    FROM 
        client_health
    WHERE 
        client_id = ?
    GROUP BY 
        YEAR(_date), MONTH(_date)
    ORDER BY 
        year, month;
  `;
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });


    // Initialize response array for 12 months (index 0-11)
    const response = Array(12).fill(0);

    // Check if the results are in the expected format
    if (results.length === 0) {
      console.log("No data found for this clientId.");
    } else {
      // Map the results to the response array
      results.forEach(({ month, avg_weight }) => {
        if (month >= 1 && month <= 12) {
          response[month - 1] = avg_weight; // Map avg_speed to correct month index
        } else {
          console.warn(`Invalid month value: ${month}`);
        }
      });
    }

    // Send response
    res.json(response); // Send valid JSON response
  } catch (error) {
    console.error("Error fetching client health data:", error);
    res.status(500).json({ error: 'Error fetching client health data' }); // Always send JSON
  }
});


app.get('/get-client-stamina/:clientId', async (req, res) => {
  const clientId = req.params.clientId;

  const query = `
    SELECT 
        YEAR(_date) AS year,
        MONTH(_date) AS month,
        AVG(stamina) AS avg_stamina
    FROM 
        client_health
    WHERE 
        client_id = ?
    GROUP BY 
        YEAR(_date), MONTH(_date)
    ORDER BY 
        year, month;
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });


    // Initialize response array for 12 months (index 0-11)
    const response = Array(12).fill(0);

    // Check if the results are in the expected format
    if (results.length === 0) {
      console.log("No data found for this clientId.");
    } else {
      // Map the results to the response array
      results.forEach(({ month, avg_stamina }) => {
        if (month >= 1 && month <= 12) {
          response[month - 1] = avg_stamina; // Map avg_speed to correct month index
        } else {
          console.warn(`Invalid month value: ${month}`);
        }
      });
    }

    // Send response
    res.json(response); // Send valid JSON response
  } catch (error) {
    console.error("Error fetching client health data:", error);
    res.status(500).json({ error: 'Error fetching client health data' }); // Always send JSON
  }
});
app.get('/get-client-speed/:clientId', async (req, res) => {
  const clientId = req.params.clientId;

  const query = `
    SELECT 
        YEAR(_date) AS year,
        MONTH(_date) AS month,
        AVG(speed) AS avg_speed
    FROM 
        client_health
    WHERE 
        client_id = ?
    GROUP BY 
        YEAR(_date), MONTH(_date)
    ORDER BY 
        year, month;
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });


    // Initialize response array for 12 months (index 0-11)
    const response = Array(12).fill(0);

    // Check if the results are in the expected format
    if (results.length === 0) {
      console.log("No data found for this clientId.");
    } else {
      // Map the results to the response array
      results.forEach(({ month, avg_speed }) => {
        if (month >= 1 && month <= 12) {
          response[month - 1] = avg_speed; // Map avg_speed to correct month index
        } else {
          console.warn(`Invalid month value: ${month}`);
        }
      });
    }

    // Send response
    res.json(response); // Send valid JSON response
  } catch (error) {
    console.error("Error fetching client health data:", error);
    res.status(500).json({ error: 'Error fetching client health data' }); // Always send JSON
  }
});


app.get('/get-client-bmi/:clientId', async (req, res) => {
  const clientId = req.params.clientId;

  const query = `
    SELECT 
        YEAR(_date) AS year,
        MONTH(_date) AS month,
        AVG(stamina) AS avg_bmi
    FROM 
        client_health
    WHERE 
        client_id = ?
    GROUP BY 
        YEAR(_date), MONTH(_date)
    ORDER BY 
        year, month;
  `;


  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });


    // Initialize response array for 12 months (index 0-11)
    const response = Array(12).fill(0);

    // Check if the results are in the expected format
    if (results.length === 0) {
      console.log("No data found for this clientId.");
    } else {
      // Map the results to the response array
      results.forEach(({ month, avg_bmi }) => {
        if (month >= 1 && month <= 12) {
          response[month - 1] = avg_bmi; // Map avg_speed to correct month index
        } else {
          console.warn(`Invalid month value: ${month}`);
        }
      });
    }

    // Send response
    res.json(response); // Send valid JSON response
  } catch (error) {
    console.error("Error fetching client health data:", error);
    res.status(500).json({ error: 'Error fetching client health data' }); // Always send JSON
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



