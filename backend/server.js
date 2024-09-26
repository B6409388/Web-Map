// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const licensesRouter = require('./routes/licenses'); // นำเข้า licenses route

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ใช้ API endpoint สำหรับ licenses
app.use('/api/licenses', licensesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
