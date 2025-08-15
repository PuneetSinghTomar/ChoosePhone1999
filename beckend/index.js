// index.js

import dotenv from 'dotenv';
dotenv.config();  // Load environment variables early

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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

import userRoutes from './route/User_Route.js';
import phoneRoutes from './route/AddPhone_route.js';
import tabletRoutes from './route/AddTablet_route.js';
import laptopRoutes from './route/AddLaptop_route.js';
import smartwatchRoutes from './route/AddSmartwatch_route.js';
import headphoneRoutes from './route/AddHeadphone_route.js';
import televisionRoutes from './route/AddTelevision_route.js';
import airconditionerRoutes from './route/AddAirconditioner_route.js';
import washingmachineRoutes from './route/AddWashingmachine_route.js';
import cameraRoutes from './route/AddCamera_route.js';
import refrigeratorRoutes from './route/AddRefrigerator_route.js';
import blogRoutes from './route/blogRoute.js';
import AdminUserRoutes from './route/AdminUser_route.js';
import statsRoutes from './route/visitor_route.js';
import visitorRoutes from './route/actualVisitor_route.js';
import ratingRoutes from './route/Rating_route.js';
import AuthorRoutes from './route/AuthorRoute.js';
import visitRoutes from './route/visit.routes.js';
import connectToDatabase from './Database/db.js';
import sitemapBlogRoute from "./route/sitemap.js";


const app = express();

// 👉 Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS setup for local + deployment
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://192.168.31.223:3000',
    'https://choosephone1999-frontends24.onrender.com',
    'https://choosephone1999-frontend.onrender.com',
    'https://choosephone.co.in'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Middleware
app.use(express.json());

// ✅ Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB connection
const URI = process.env.MongoDbURI;
if (!URI) {
  console.error('❌ MongoDB URI is undefined. Check your .env file.');
  process.exit(1);
}
connectToDatabase(URI);

// ✅ Read routes
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

// ✅ Create/Update/Delete routes
app.use('/api/users', userRoutes);
app.use('/api', phoneRoutes);
app.use('/tabletapi', tabletRoutes);
app.use('/laptopapi', laptopRoutes);
app.use('/smartwatchapi', smartwatchRoutes);
app.use('/headphoneapi', headphoneRoutes);
app.use('/televisionapi', televisionRoutes);
app.use('/washingmachineapi', washingmachineRoutes);
app.use('/airconditionerapi', airconditionerRoutes);
app.use('/refrigeratorapi', refrigeratorRoutes);
app.use('/cameraapi', cameraRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/visitor', visitorRoutes);
app.use('/Ratingapi', ratingRoutes);
app.use('/AdminApi', AdminUserRoutes);
app.use('/api/blog/blogs', blogRoutes);
app.use('/Author', AuthorRoutes);
app.use('/api/visits', visitRoutes);
app.use("/sitemap", sitemapBlogRoute);
// ✅ Health check/test route
app.get('/api/test', (req, res) => {
  res.send('✅ Backend is working!');
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});
