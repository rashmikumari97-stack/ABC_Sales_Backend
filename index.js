const express = require("express");
const { connectDB, sql } = require("./config/db");
const customerRoutes = require('./routes/customerRoutes')
const productRoutes = require('./routes/productRoutes')
const discountRoutes= require('./routes/discountRoutes')
const taxationRoutes= require('./routes/taxationRoutes')
const authRoute = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')

const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors()); // Enables CORS for all routes and origins
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Backend server is running");
});
app.use("/api/auth",authRoute)
app.use("/api/customers",customerRoutes)
app.use("/api/products",productRoutes)
app.use("/api/discounts", discountRoutes)
app.use('/api/taxations', taxationRoutes)
const startServer = async () => {
  try {
    console.log('starting server')
    await connectDB();
    console.log('starting server DB connected')
    app.listen(PORT, async () => {
      console.log(`Srver is started on port ${PORT}`);
    });
  } catch(error) {
    console.error(error,"SERVER starting failed");
  }
  
};
startServer();
