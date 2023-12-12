const express = require("express");
const router = require("./routes/router");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
server.use(express.json({ limit: "200mb" }));
server.use(express.text({ limit: "200mb" }));

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
