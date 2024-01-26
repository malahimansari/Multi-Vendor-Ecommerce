const express = require('express');
require('dotenv').config();
const config = require("./config/config");
const app = express();
app.use(express.json({ extended: false }));

config();

// routes
app.use("/api/v1/users/", require("./routes/userRoutes"));
app.use("/api/v1/auth/", require("./routes/authRoutes"));
app.use("/api/v1/products/", require("./routes/productRoutes"));
app.use("/api/v1/orders/", require("./routes/orderRoutes"));
app.use("/api/v1/payments/", require("./routes/paymentRoutes"));

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running ${PORT}`));



