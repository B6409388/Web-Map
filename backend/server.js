const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const LicensePlate = require('./models/DataLicentSchema'); // นำเข้าโมเดล LicensePlate
const licensesRouter = require('./routes/licenses'); // นำเข้า licenses route

const app = express();
const port = process.env.PORT || 5000;

// เชื่อมต่อ MongoDB Atlas
const dbURI =
  "mongodb+srv://rattanunforwork:new123456@cluster0.s38jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // เพิ่มขนาด limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// สร้าง route สำหรับดึงข้อมูล License Plates
app.get('/api/licenses/latest', async (req, res) => {
  try {
    const licenses = await LicensePlate.find()
      .sort({ created_at: -1 }) // เรียงลำดับจากใหม่ไปเก่า
      .limit(10); // เปลี่ยนจำนวนที่ต้องการแสดงตามต้องการ

    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
