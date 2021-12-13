const express = require("express");
const { protect } = require("../../utils/authentication");

const router = express.Router();

const { tradeAssets, getAssets, aggregateTrades } = require("./controller");

router.get("/all", protect, getAssets);

router.get("/aggregate", protect, aggregateTrades);

router.post("/buy", tradeAssets);

module.exports = router;
