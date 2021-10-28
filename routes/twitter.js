var express = require("express");
var router = express.Router();
var HttpStatus = require("http-status-codes");
const Twit = require("twit");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});


router.post("/", (req, res) => {
  const message = req.body.message;

  T.post("statuses/update", { status: message }, (err, reply) => {
    if (err) {
      console.log("Error: ", err.message);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    } else {
        console.log("Success: ", reply);
        res.sendStatus(HttpStatus.StatusCodes.CREATED);
    }
  });
});

module.exports = router;