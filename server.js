require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Example route
app.get('/', (req, res) => {
  res.send('🚑 EMC-EMS App is running!');
});
// Test route to get data from MongoDB
// Route to get all patients
app.get('/data', async (req, res) => {
  try {
    const patients = await mongoose.connection.db
      .collection('patients')  // Go into the patients collection
      .find({})                // Find everything in it
      .toArray();               // Turn it into an array

    res.json({ message: "Connected to MongoDB", data: patients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
