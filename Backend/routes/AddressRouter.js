const express = require("express");
const router = express.Router();
const { AddressController, getUserAddress } = require("../controllers/AddressController");
const ensureAuthenticated = require("../Middleware/Auth");

router.post("/add-address", ensureAuthenticated, AddressController);
router.get('/get-address', ensureAuthenticated, getUserAddress);

module.exports = router;
