const path = require("path");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
;

const app = express();
const port = 3000;
const upload = multer({ storage })
// This creates a multer instance that will store uploaded files in the './uploads/' directory


app.set("views", path.resolve("./ views"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); // Removed the extra space
app.use(express.json());

// This middleware processes and parses incoming form data from HTTP POST requests
// When set to false, it uses a simple parser
// When set to true, it can handle complex form data with nested fields
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  // This retrieves the uploaded file from the request object
  console.log(req.file);
  console.log(req.body);
  // You can now process the file as needed, such as saving it to a database or performing some other action
  return res.redirect("/"); // Redirect back to the homepage after processing the form
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
