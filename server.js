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
// Test route to get data from MongoDB
app.get('/data', async (req, res) => {
  try {
    const patients = await mongoose.connection.db
      .collection("patients")
      .find({})
      .toArray();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
