const express = require("express"); // Import the Express framework — helps you build APIs and web servers easily
const cors = require("cors"); // Import CORS middleware — allows requests from other origins (like your Android app)

// Create an Express application instance
const app = express();
app.use(cors()); // Tell Express to use CORS so it can handle requests from other apps/websites

// Define a JSON object containing electric rate data
const rates = {
  onGridRate: 11.2924,
  offGridRate: 10.12,
  fixedCharge: 5.6,
  lastUpdated: "2025-04-18"
};

// Define a GET endpoint at "/rates"
// When someone visits http://localhost:3000/rates, this function runs
app.get("/rates", (req, res) => {
  res.json(rates); // Send the 'rates' object as a JSON response
});

// Define which port your server should listen on
// It uses the environment variable PORT (if deployed) or defaults to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`)); // Start the server and print a message when it’s running
