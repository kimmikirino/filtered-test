const express = require("express");

const app = express();

const fs = require("fs");

var cors = require("cors");

app.use(cors());

const port = 3001;

app.get("/employees/all", function (req, res) {
  let rawdata = fs.readFileSync("./public/employees.json");

  let employees = JSON.parse(rawdata);

  res.send(employees);
});

app.get("/employees/search/:name", function (req, res) {
  let rawdata = fs.readFileSync("./public/employees.json");

  let employeeData = JSON.parse(rawdata);

  console.log(req.params.name);
  const result = employeeData.employees.filter((emp) =>
    emp.name.toLowerCase().includes(req.params.name.toLowerCase())
  );

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
