// backend/routes/licenses.js
const express = require('express');
const LicensePlate = require('../models/DataLicentSchema'); // เปลี่ยนชื่อไฟล์ให้ตรง
const router = express.Router();

// GET: ดึงข้อมูลทั้งหมด
router.get('/', async (req, res) => {
  try {
    const licenses = await LicensePlate.find();
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: บันทึกข้อมูลใหม่
router.post('/', async (req, res) => {
  const { licentplateNumber, licentplateProvince, licentplateImg, lat, long } = req.body;

  const newLicensePlate = new LicensePlate({
    licentplateNumber,
    licentplateProvince,
    licentplateImg,
    lat,
    long,
  });

  try {
    const savedLicense = await newLicensePlate.save();
    res.status(201).json(savedLicense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
