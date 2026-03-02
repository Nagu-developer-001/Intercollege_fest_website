require("dotenv").config();   

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());
//const express = require("express");
const path = require("path");

//const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


mongoose.connect(process.env.MONGO_URI);

app.use("/admin", adminRoutes);
app.use("/event", eventRoutes);
app.get("/", (req, res) => {
    res.send("Backend is running");
});
app.listen(5000, () => console.log("Server running"));