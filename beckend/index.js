// index.js
import dotenv from 'dotenv';
dotenv.config(); // Load env variables before anything else

import express from 'express';
import cors from 'cors';

// DB
import connectToDatabase from './Database/db.js';

// Display Routes
import phoneRoute from './route/PhoneDisplay_route.js';
import tabletRoute from './route/TabletDisplay_route.js';
import laptopRoute from './route/LaptopDisplay_route.js';
import headphoneRoute from './route/HeadphoneDisplay_route.js';
import smartwatchRoute from './route/SmartwatchesDisplay_route.js';
import televisionRoute from './route/TelevisionDisplay_route.js';
import refrigeratorRoute from './route/RefrigeratorDisplay_route.js';
import washingmachineRoute from './route/WashingmachineDisplay_route.js';
import airconditionerRoute from './route/AirconditionerDisplay_route.js';
import cameraRoute from './route/CameraDisplay_route.js';

// Add Routes
import userRoutes from "./route/User_Route.js";
import phoneRoutes from "./route/AddPhone_route.js";
import tabletRoutes from "./route/AddTablet_route.js";
import laptopRoutes from "./route/AddLaptop_route.js";
import smartwatchRoutes from "./route/AddSmartwatch_route.js";
import headphoneRoutes from "./route/AddHeadphone_route.js";
import televisionRoutes from "./route/AddTelevision_route.js";
import airconditionerRoutes from "./route/AddAirconditioner_route.js";
import washingmachineRoutes from "./route/AddWashingmachine_route.js";
import cameraRoutes from "./route/AddCamera_route.js";
import refrigeratorRoutes from "./route/AddRefrigerator_route.js";

// Others
import AdminUserRoutes from './route/AdminUser_route.js';
import statsRoutes from "./route/visitor_route.js";
import visitorRoutes from "./route/actualVisitor_route.js";
import ratingRoutes from './route/Rating_route.js';

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://192.168.31.223:3000",
    "https://choosephone1999-frontends24.onrender.com " // ✅ Add your Render frontend URL here
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Handle Preflight
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Basic health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use('/phones', phoneRoute);
app.use('/tablets', tabletRoute);
app.use('/laptops', laptopRoute);
app.use('/headphones', headphoneRoute);
app.use('/smartwatches', smartwatchRoute);
app.use('/televisions', televisionRoute);
app.use('/refrigerators', refrigeratorRoute);
app.use('/washingmachines', washingmachineRoute);
app.use('/cameras', cameraRoute);
app.use('/airconditioners', airconditionerRoute);

app.use("/api/users", userRoutes);
app.use('/api/phones', phoneRoutes);
app.use('/api/tablets', tabletRoutes);
app.use('/api/laptops', laptopRoutes);
app.use('/api/smartwatches', smartwatchRoutes);
app.use('/api/headphones', headphoneRoutes);
app.use('/api/televisions', televisionRoutes);
app.use('/api/washingmachines', washingmachineRoutes);
app.use('/api/airconditioners', airconditionerRoutes);
app.use('/api/refrigerators', refrigeratorRoutes);
app.use('/api/cameras', cameraRoutes);

app.use("/api/stats", statsRoutes);
app.use("/api/visitor", visitorRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', AdminUserRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode,
  });
});

// Start server
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDbURI;

connectToDatabase(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit if DB connection fails
  });
