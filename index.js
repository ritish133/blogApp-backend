const express = require("express");
const app = express();

require('dotenv').config();
const PORT=process.env.PORT || 3000;

//middleware
app.use(express.json());

//route
const blog=require('./routes/blog');

//mount
app.use('/api/v1',blog);

//database connection
const connectWithDb=require('./config/database')
connectWithDb();

//start the server
app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});

//Default Route
app.get("/", (req,res) => {
  res.send("<h1>This is My HomePage</h1>");
});
