const express = require("express");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

// Parse incoming JSON requests
app.use(express.json());

// Parse HTML form data
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Temporary route to verify the API is working
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Blog API is running 🚀",
    });
});

/*
|--------------------------------------------------------------------------
| Export App
|--------------------------------------------------------------------------
*/

module.exports = app;