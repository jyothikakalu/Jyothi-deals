
const express = require('express');
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: JSON.parse(course),
      image: req.file.path,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

