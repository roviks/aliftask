const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.get("/users", async (req, res, next) => {
  try {
    const response = await axios.get("http://jsonplaceholder.typicode.com/users");
    res.header("Access-Control-Allow-Origin", "*");
    return res.send(response.data);
  } catch (e) {
    next(e);
  }
});


app.get("/todos", async (req, res, next) => {
  try {
    const response = await axios.get("http://jsonplaceholder.typicode.com/todos");
    res.header("Access-Control-Allow-Origin", "*");
    return res.send(response.data);
  } catch (e) {
    next(e);
  }
});

app.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));