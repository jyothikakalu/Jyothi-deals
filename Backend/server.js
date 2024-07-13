// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const bodyParser = require('body-parser');
// // // const cors = require('cors');
// // // const employeeRoutes = require("./routes/employee")

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // // Middleware
// // // app.use(cors());
// // // app.use(bodyParser.json());
// // // app.use(bodyParser.urlencoded({ extended: true }));
// // // app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory

// // // // Routes
// // // app.use('/api/employees', employeeRoutes);

// // // // Connect to MongoDB
// // // const dbConnect=async ( )=>{
// // //     try{
// // //         mongoose.connect("mongodb://127.0.0.1:27017/Employee")
// // //     }

// // //     catch(error){
// // //         console.log("something went wrong in connecting db")
// // //     }   
// // //  }


// // // // Start server
// // // app.listen(PORT, async() => {
// // //     await dbConnect()
// // //   console.log(`Server running on port ${PORT} and db connected`);
// // // });
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const employeeRoutes = require('./routes/employee');

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory

// // // Routes
// // app.use('/api/employees', employeeRoutes);

// // // Connect to MongoDB
// // const dbConnect = async () => {
// //   try {
// //     await mongoose.connect("mongodb://127.0.0.1:27017/Employee", {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log("Database connected");
// //   } catch (error) {
// //     console.log("Something went wrong in connecting DB", error);
// //     process.exit(1);
// //   }
// // }

// // // Start server
// // app.listen(PORT, async () => {
// //   await dbConnect();
// //   console.log(`Server running on port ${PORT}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const employeeRoutes = require('./routes/employee');

// const app = express();
// const hostName="127.0.0.5"
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// // Routes
// app.use('/api/employees', employeeRoutes);

// // Connect to MongoDB
// const dbConnect = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/Employee", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Database connected");
//   } catch (error) {
//     console.log("Something went wrong in connecting DB", error);
//     process.exit(1);
//   }
// }

// // Start server
// app.listen(PORT, async () => {
//   await dbConnect();
//   console.log(`server started at http://${hostName}:${PORT}`)
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./routes/employee');

const app = express();
const PORT = process.env.PORT || 5000;
const hostName = "127.0.0.5";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// Routes
app.use('/api/employees', employeeRoutes);

// Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Employee", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Something went wrong in connecting DB", error);
    process.exit(1);
  }
};

// Start server
app.listen(PORT, async () => {
  await dbConnect();
  console.log(`server started at http://${hostName}:${PORT}`);
});
