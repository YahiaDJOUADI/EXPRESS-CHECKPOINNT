const express = require("express");
const app = express();
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("This application is only available Monday to Friday, 9am to 5pm.");
  }
};
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public",express.static("public"));

app.get("/", checkWorkingHours, (req, res) => {
  res.render("home");
});

app.get("/services", checkWorkingHours, (req, res) => {
  res.render("services");
});

app.get("/contact", checkWorkingHours, (req, res) => {
  res.render("contact");
});
app.post('/contact', (req, res) => {
  console.log(req.body);
  res.redirect("/")
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
