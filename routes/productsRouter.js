require("dotenv").config();
const express = require("express");
const router = express.Router();
const elastic = require("elasticsearch");
const bodyParser = require("body-parser").json();
const cagarBudayaList = require("./../dummy/cagar-budaya");
const { ELASTICSEARCH_HOST } = process.env;

const elasticClient = elastic.Client({
  host: ELASTICSEARCH_HOST,
});

router.use((req, res, next) => {
  elasticClient
    .index({
      index: "my-application",
      body: {
        url: req.url,
        method: req.method,
      },
    })
    .then((res) => {
      console.log("logs index");
    })
    .catch((err) => {
      console.log("logs index");
    });
  next();
});

router.get("/", function (req, res, next) {
  res.status(200).send({
    message: "Success",
    code: 200,
    results: cagarBudayaList,
  });
});

router.post("/", function (req, res, next) {
  elasticClient
    .index({
      index: "my-application",
      body: {
        body: req.body,
      },
    })
    .then((res) => {
      res.status(200).send({
        message: "Success",
        code: 200,
        results: null,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error",
        code: 500,
        results: null,
      });
      //   console.log("logs index");
    });
  //   next();
  // res.status(200).send({
  //   message: "Success",
  //   code: 200,
  //   results: cagarBudayaList,
  // });
});

module.exports = router;
