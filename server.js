// Dependencies
const express = require("express");
const apiRoute = require("./Main/routes/APIroute");
const htmlRoute = require("./Main/routes/HTMLroute");

// Set up app & port
const app = express();
const PORT = process.env.PORT || 3001;

