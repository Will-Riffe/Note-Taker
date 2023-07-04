// Dependencies
const express = require("express");
const apiRoute = require("./routes/apiRoutes");
const htmlRoute = require("./routes/htmlRoutes");

// Set up app & port
const app = express();
const PORT = process.env.PORT || 3001;

// Established middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoute);
app.use("/", htmlRoute);

// Server Start---
app.listen(PORT, () => console.log(`Good to go at PORT: ${PORT}`));