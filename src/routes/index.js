const { Router } = require('express');

const router = new Router({});

router.use("/casino", require("./casino"));
router.use("/dealer", require("./dealer"));
router.use("/user", require("./user"));

module.exports = router;