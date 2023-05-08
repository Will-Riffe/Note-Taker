// Setting up Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Setting up Express
const app = express();
const PORT = process.env.PORT || 3001;

// Setting up some routes to our assets
const apiRoutes = require('./Develop/public/assets/js/apiRoutes');
const htmlRoutes = require('./Develop/public/assets/js/htmlRoutes');

// Setting up for Error Handling
const { validateNote } = require('./Develop/public/assets/js/validationMiddleware');
const { errorHandler } = require('./Develop/public/assets/js/errorHandlerMiddleware');


// Middleware
/* ------------------------------- */

// Parses requests with urlencoded payloads
//Recognizes Request Object as Strings/Arrays
app.use(express.urlencoded({ extended: true}));

//Recognizes Request as JSON payload
app.use(express.json());

// Serves static files in "public" folder
app.use(express.static("public"));
 
// Routes
app.use('/api', apiRoutes);
app.use(htmlRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Notes App Is Live at ${PORT}`));


/* ------------------------------- */