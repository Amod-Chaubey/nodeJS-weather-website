const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//define path for Express config
const publicDirPath = path.join(__dirname, "../public");
const views = path.join(__dirname, "../templets/views"); //creating a path express, view required folder
const partialspath = path.join(__dirname, "../templets/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", views); //setting views folder to variable view
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    nameOf: "Amod",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    nameOf: "Amod",
    message: "some helpful text here",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About", nameOf: "Amod" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Enter a address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: "enter a valid address" });
      }
      forecast(latitude, longitude, (errors, datas) => {
        if (errors) {
          return res.send({ error: "enter a valid address" });
        }
        console.log(location);
        console.log(datas);
        res.send({
          address: req.query.address,
          forecast: datas,
          location: location,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help Artical not found",
    title: "404/help",
    nameOf: "Amod",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "page not found",
    title: "404",
    nameOf: "Amod",
  });
});

app.listen(port, () => {
  console.log("server is up on " + port);
});
