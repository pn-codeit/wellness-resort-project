const express = require("express");
const router = express.Router();

router.get("/configurator", (req, res) => {
  res.render("pages/configurator", { title: "Wellness Configurator" });
});

router.get("/booking", (req, res) => {
  res.render("pages/booking", { title: "Booking" });
});

module.exports = router;