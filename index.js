// Import required Node.js path module for handling file paths
const path = require("path");
// Import Express.js framework
const express = require("express");
// Import multer middleware for handling file uploads
const multer = require("multer");

// Configure multer storage settings for file uploads
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: function (req, file, cb) {
    return cb(null, "./uploads/");
  },
  // Generate unique filenames for uploaded files using timestamp
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create Express application instance
const app = express();
// Define server port number using environment variable or default to 3000
const port = process.env.PORT || 3000;
// Initialize multer middleware with configured storage
const upload = multer({ storage })

// Set the directory for view templates
app.set("views", path.join(__dirname, "views"));
// Set EJS as the template engine
app.set("view engine", "ejs");

// Remove these duplicate lines
// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));

// Enable JSON parsing middleware
app.use(express.json());

// Enable URL-encoded data parsing with simple parser
app.use(express.urlencoded({ extended: false }));

// Define route handler for homepage
app.get("/", (req, res) => {
  return res.render("homepage");
});

// Handle file upload POST requests
app.post('/upload', upload.single('profileImage'), (req, res) => {
    const fileInfo = {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        fileSize: req.file.size,
        filePath: req.file.path,
        mimeType: req.file.mimetype
    };
    
    // Render a new view with the file information
    res.render('upload-success', { fileInfo });
});

// Start the server and listen on specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
